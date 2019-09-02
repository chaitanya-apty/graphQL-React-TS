import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { getEmployeeDetails } from '../../graphclient/queries/queries';

import './view.component.css';
import { memHistory } from '../../common/router-helpers/router';
import { QueryResult } from '@apollo/react-common';
import equals from 'ramda/es/equals';

interface Employee {
    name: string;
    age: number;
    location: {
        name: string;
    };
}

const defaultEmployee: Employee = {
    name: '',
    age: -1,
    location: {
        name: ''
    }
};

function ViewEmployee(props: { employee: Employee }): JSX.Element {
    const employee = props.employee;
    return (
    <>
        <button type='button' className='w3-button' onClick={memHistory.goBack}>Go Back ...</button>
        <div className="cutout card purple-card">
        <h2>{employee.name}</h2>
        <p>Age {employee.age}</p>
        <button className="btn">{employee.location.name}</button>
        </div> 
    </>
    )
}

const EmployeeView: React.FC = (props: any): JSX.Element => {
    const [employee, setEmployee] = useState<Employee>(defaultEmployee);
    const [isLoading, setLoading] = useState<boolean>(true);
    const gData: QueryResult = useQuery(getEmployeeDetails, {
                        variables: { id: props.match.params.id},
                        skip: !(props.match || props.match.params['id'])
                        });

    useEffect(() => {
        const {loading}  = gData;
        if(!equals(loading, isLoading)) {
            setLoading(loading);
        }
    }, [gData, isLoading]);

    useEffect(() => {
        const {data}  = gData;
        if (data && !equals(employee, data.employee)) {
            setEmployee(data.employee as Employee)
        }
    }, [gData, employee]);


    return (
        <div className="card-container">
            {
                isLoading ? <div className='loader'></div> : <ViewEmployee employee={employee}/>
            }
        </div>

    )
}
export default EmployeeView;
