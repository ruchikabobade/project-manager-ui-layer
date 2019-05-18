import React from 'react';
import { shallow } from 'enzyme';
import ViewUser from './ViewUser';


describe('ViewUser' , () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<ViewUser user = {''} key = {' '} />))

    it('should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(5);
    });

    it('should render a <input/>', () => {
        expect(wrapper.find('input').length).toEqual(3);
    });

    // it('should click sortBy EmployeeId', () => {
    //     const wrapper = shallow(<ViewUser user={''} onSelectEditUser={''}/>)
    //     const instance = wrapper.instance();
    //     jest.spyOn(instance, 'updateUser');
    //     wrapper.find('button').first().simulate('click');
    //     expect(instance.updateUser).toHaveBeenCalled();
    //   })

})