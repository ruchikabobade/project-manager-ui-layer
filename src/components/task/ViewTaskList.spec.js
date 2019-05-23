import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ViewTaskList from './ViewTaskList';

Enzyme.configure({ adapter: new Adapter() });

describe('ViewTaskList' , () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<ViewTaskList task={''}/>))

    it('should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(24);
    });

})