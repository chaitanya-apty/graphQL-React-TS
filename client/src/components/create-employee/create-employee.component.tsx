import React, { useState, useEffect, memo } from 'react';
import { graphql, compose } from 'react-apollo';
import { getLocationList, getEmployeeList } from '../../graphclient/queries/queries';
import { addEmployeeMutation } from '../../graphclient/queries/mutations';

import './create-employee.component.css';

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
    const [locations, setLocale] = useState([]);
    const [employee, setEmployee] = useState(defaultDetails);


    useEffect(() => {
        // One time Activity
        const request = props.getLocationList;
        if (request.locations) {
            setLocale(request.locations.slice());
        }
    }, [props.getLocationList]);

    const setEmployeeDetails = (key: keyof Employee, value: string | number) => {
        if (typeof value === 'string' && value.trim().length < 2) return;
        setEmployee({
            ...employee,
            [key]: value
        })
    }

    const submitEmployeeDetails = function (e: any) {
        e.preventDefault();
        props.addEmployeeMutation({
            variables: {
                ...employee
            },
            refetchQueries: [{
                query: getEmployeeList
            }]
        })
        e.target.reset();
    }

    return (
        <div className='create__employee'>
            <form className='create-card w3-card w3-container w3-light-grey'
                onSubmit={submitEmployeeDetails}>
                <div className="field">
                    <label>Name:</label>
                    <input
                        required
                        type="text"
                        className='w3-input w3-border w3-round'
                        onChange={(e) => setEmployeeDetails('name', e.target.value)} />
                </div>

                <div className="field">
                    <label>Age:</label>
                    <input
                        required
                        type="number" min="0" max='99'
                        className='w3-input w3-border w3-round'
                        onChange={(e) => setEmployeeDetails('age', +e.target.value)} />
                </div>

                <div className="field">
                    <label>ID</label>
                    <input
                        required
                        type="number"
                        className='w3-input w3-border w3-round'
                        max='999'
                        onChange={(e) => setEmployeeDetails('id', +e.target.value)} />
                </div>

                <div className="field">
                    <label>Location:</label>
                    <select
                        required
                        className='w3-select w3-border'
                        defaultValue='-1'
                        onChange={(e) => {
                            const locationValue = e.target.value;
                            setEmployeeDetails('location', locationValue);
                        }}>
                        <option disabled value='-1'>Select Location(Required)</option>
                        {locations.map((loc, i) => <option key={i} value={loc['id']}>{loc['name']}</option>)}
                    </select>
                </div>

                <button
                    type='submit'
                    className='create-button w3-button w3-hover-orange w3-green'
                >Create Employee</button>
            </form>
        </div>

    )
}

export default memo(compose(
    graphql(getLocationList, { name: 'getLocationList' }),
    graphql(addEmployeeMutation, { name: 'addEmployeeMutation' })
)(CreateEmployee));
