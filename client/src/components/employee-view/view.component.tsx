import React, { useEffect, memo, useState } from 'react';
import { graphql } from 'react-apollo';
import { getEmployeeDetails } from '../../graphclient/queries/queries';

import './view.component.css';
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

const EmployeeView: React.FC = (props: any): JSX.Element => {
    const [employee, setEmployee] = useState<Employee>(defaultEmployee);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const { data } = props;
        if (!equals(isLoading, data.loading)) {
            setLoading(data.loading);
        }
    }, [props, isLoading]);

    useEffect(() => {
        const { data } = props;
        if (data && !equals(employee, data.employee)) {
            setEmployee(data.employee as Employee)
        }
    }, [props, employee]);


    return (
        <div className="card-container">
            {
                isLoading ? <div className='loader'></div> :
                    <div className="cutout card purple-card">
                        <h2>{employee.name}</h2>
                        <p>Age {employee.age}</p>
                        <button className="btn">{employee.location.name}</button>
                    </div>
            }
        </div>

    )
}

export default memo(graphql(getEmployeeDetails, {
    options: (props) => ({
        variables: {
            id: props.match.params.id
        }
    }),
    skip: (props: any) => !props.match.params.id
})(EmployeeView));
