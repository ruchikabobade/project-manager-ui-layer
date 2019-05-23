import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import AddTask from './AddTask';


describe('AddTask' , () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<AddTask/>))

    it('should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(54);
    });

    it('should render a <form/>', () => {
        expect(wrapper.find('form').length).toEqual(1);
    });

    it('should call onChangeProject', () => {
        const event = {
          target: { value: 'the-value' }
        };
        const wrapper = mount(<AddTask />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onChangeProject');
        wrapper.instance().forceUpdate()
        wrapper.update()
        wrapper.find('input').first().simulate('change', event);
        expect(instance.onChangeProject).toHaveBeenCalled();
      });
    
      it('should call onChangeIsParent', () => {
        const event = {
          target: { value: 'the-value' }
        };
        const wrapper = mount(<AddTask />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onChangeIsParent');
        wrapper.instance().forceUpdate()
        wrapper.update()
        const input = wrapper.find('#isParent')
        input.simulate('change', event)
        expect(instance.onChangeIsParent).toHaveBeenCalled();
      });

      it('should call onChangeTask', () => {
        const event = {
          target: { value: 'the-value' }
        };
        const wrapper = mount(<AddTask />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onChangeTask');
        wrapper.instance().forceUpdate()
        wrapper.update()
        const input = wrapper.find('#task')
        input.simulate('change', event)
        expect(instance.onChangeTask).toHaveBeenCalled();
      });

      it('should call onChangePriority', () => {
        const event = {
          target: { value: 'the-value' }
        };
        const wrapper = mount(<AddTask />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onChangePriority');
        wrapper.instance().forceUpdate()
        wrapper.update()
        const input = wrapper.find('#myRange')
        input.simulate('change', event)
        expect(instance.onChangePriority).toHaveBeenCalled();
      });

      it('should call onChangeParentTask', () => {
        const event = {
          target: { value: 'the-value' }
        };
        const wrapper = mount(<AddTask />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onChangeParentTask');
        wrapper.instance().forceUpdate()
        wrapper.update()
        const input = wrapper.find('#parentTask')
        input.simulate('change', event)
        expect(instance.onChangeParentTask).toHaveBeenCalled();
      });

      it('should call onChangeStartDate', () => {
        const event = {
          target: { value: 'the-value' }
        };
        const wrapper = mount(<AddTask />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onChangeStartDate');
        wrapper.instance().forceUpdate()
        wrapper.update()
        const input = wrapper.find('#startDate')
        input.simulate('change', event)
        expect(instance.onChangeStartDate).toHaveBeenCalled();
      });

      it('should call onChangeEndDate', () => {
        const event = {
          target: { value: 'the-value' }
        };
        const wrapper = mount(<AddTask />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onChangeEndDate');
        wrapper.instance().forceUpdate()
        wrapper.update()
        const input = wrapper.find('#endDate')
        input.simulate('change', event)
        expect(instance.onChangeEndDate).toHaveBeenCalled();
      });

      it('should call onChangeUser', () => {
        const event = {
          target: { value: 'the-value' }
        };
        const wrapper = mount(<AddTask />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onChangeUser');
        wrapper.instance().forceUpdate()
        wrapper.update()
        const input = wrapper.find('#user')
        input.simulate('change', event)
        expect(instance.onChangeUser).toHaveBeenCalled();
      });

      it('should call onReset', () => {
        const event = {
          target: { value: 'the-value' }
        };
        const wrapper = mount(<AddTask />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onReset');
        wrapper.instance().forceUpdate()
        wrapper.update()
        const button = wrapper.find('#reset')
        button.simulate('click', event)
        expect(instance.onReset).toHaveBeenCalled();
      });
    
      it('should call submitUser', () => {
        const event = {
          target: { value: 'the-value' }
        };
        const wrapper = mount(<AddTask />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onSubmit');
        wrapper.instance().forceUpdate()
        wrapper.update()
        const input = wrapper.find('#formSubmit')
        input.simulate('submit', event)
        expect(instance.onSubmit).toHaveBeenCalled();
      });
    

})