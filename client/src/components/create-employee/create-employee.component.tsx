import React, { useState, useEffect, memo } from 'react';
import { graphql, compose } from 'react-apollo';
import { getLocationList, addEmployeeMutation, getEmployeeList } from '../../graphclient/queries/queries';

interface Employee {
    name: string;
    age: number;
    id: number;
    location: string;
}

const defaultDetails: Employee = {
    name: '',
    age: -1,
    id: -1,
    location: ''
};

const CreateEmployee: React.FC = (props: any): JSX.Element => {
    const [isLoading, setLoading] = useState(true);
    const [locations, setLocale] = useState([]);
    const [employee, setEmployee] = useState(defaultDetails);


    useEffect(() => {
        const request = props.getLocationList;
        setLoading(request.loading);
        if (request.locations) {
            setLocale([].concat(request.locations));
        }
    }, [props]);

    if (isLoading) {
        return <div className='loader'></div>
    }

    const setEmployeeDetails = (key: keyof Employee, value: string | number) => {
        if (typeof value === 'string' && value.trim().length < 2) return;
        setEmployee({
            ...employee,
            [key]: value
        })
    }

    const submitEmployeeDetails = function () {
        props.addEmployeeMutation({
            variables: {
                ...employee
            },
            refetchQueries: [{
                query: getEmployeeList
            }]
        })
    }

    return (
        <div>
            <div className="field">
                <label>Employee name:</label>
                <input type="text" onChange={(e) => setEmployeeDetails('name', e.target.value)} />
            </div>

            <div className="field">
                <label>Employee Age</label>
                <input type="number" min="0" max='99' onChange={(e) => setEmployeeDetails('age', +e.target.value)} />
            </div>

            <div className="field">
                <label>Employee ID</label>
                <input type="number" max='999' onChange={(e) => setEmployeeDetails('id', +e.target.value)} />
            </div>

            <div className="field">
                <label>Location:</label>
                <select
                    defaultValue='-1'
                    onChange={(e) => {
                        const locationValue = e.target.value;
                        setEmployeeDetails('location', locationValue);
                    }
                    }>
                    <option disabled value='-1'>Select Location(Required)</option>
                    {
                        locations.map((loc, i) => <option key={i} value={loc['id']}>{loc['name']}</option>)
                    }
                </select>
            </div>

            <button onClick={submitEmployeeDetails}>Submit</button>
        </div>

    )
}

export default memo(compose(
    graphql(getLocationList, { name: 'getLocationList' }),
    graphql(addEmployeeMutation, { name: 'addEmployeeMutation' })
)(CreateEmployee)
);
