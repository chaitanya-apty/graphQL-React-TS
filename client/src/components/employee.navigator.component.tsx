import React, { memo } from 'react';
import EmployeeListComponent from './employee-list/employee-list.component';
import CreateEmployeeComponent from './create-employee/create-employee.component';

const EmployeeNavigatorComponent: React.FC = (props: any): JSX.Element => {
    return (
        <div className='employee__list_route'>
            <EmployeeListComponent />
            <CreateEmployeeComponent />
        </div>
    )
}

export default memo(EmployeeNavigatorComponent);
