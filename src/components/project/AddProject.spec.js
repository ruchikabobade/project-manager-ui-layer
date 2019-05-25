import React from 'react';
import { shallow , mount} from 'enzyme';
import AddProject from './AddProject';
import DataTable from 'react-data-table-component'


describe('AddProject' , () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<AddProject/>))

    it('should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(44);
    });

    it('should render a <form/>', () => {
        expect(wrapper.find('form').length).toEqual(1);
    });

    it('should render a <input/>', () => {
        expect(wrapper.find('input').length).toEqual(9);
    });

    it('should call submitProject', () => {
        const event = {
          target: { value: 'the-value' }
        };
        const wrapper = mount(<AddProject />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'submitHandler');
        wrapper.instance().forceUpdate()
        wrapper.update()
        const input = wrapper.find('#formSubmit')
        input.simulate('submit', event)
        expect(instance.submitHandler).toHaveBeenCalled();
      });

      it('should call onReset', () => {
        const event = {
          target: { value: 'the-value' }
        };
        const wrapper = mount(<AddProject />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onReset');
        wrapper.instance().forceUpdate()
        wrapper.update()
        const button = wrapper.find('#reset')
        button.simulate('click', event)
        expect(instance.onReset).toHaveBeenCalled();
      });

      it('should call onChangeProject', () => {
        const event = {
          target: { value: 'the-value' }
        };
        const wrapper = mount(<AddProject />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onChangeProject');
        wrapper.instance().forceUpdate()
        wrapper.update()
        wrapper.find('input').first().simulate('change', event);
        expect(instance.onChangeProject).toHaveBeenCalled();
      });
    
      it('should call onChangeStartDate', () => {
        const event = {
          target: { value: 'the-value' }
        };
        const wrapper = mount(<AddProject />);
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
        const wrapper = mount(<AddProject />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onChangeEndDate');
        wrapper.instance().forceUpdate()
        wrapper.update()
        const input = wrapper.find('#endDate')
        input.simulate('change', event)
        expect(instance.onChangeEndDate).toHaveBeenCalled();
      });

      it('should call onChangePriority', () => {
        const event = {
          target: { value: 'the-value' }
        };
        const wrapper = mount(<AddProject />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onChangePriority');
        wrapper.instance().forceUpdate()
        wrapper.update()
        const input = wrapper.find('#myRange')
        input.simulate('change', event)
        expect(instance.onChangePriority).toHaveBeenCalled();
      });

      // it('should call filterList', () => {
      //   const event = {
      //     target: { value: 'the-value' }
      //   };
      //   const wrapper = mount(<AddProject />);
      //   const instance = wrapper.instance();
      //   jest.spyOn(instance, 'filterList');
      //   wrapper.instance().forceUpdate()
      //   wrapper.update()
      //   const input = wrapper.find('input').last()
      //   input.simulate('change', event)
      //   expect(instance.filterList).toHaveBeenCalled();
      // });

      it('should click sortBy startDate', () => {
        const key = "startDate";
        const wrapper = shallow(<AddProject key />)
        const instance = wrapper.instance();
        jest.spyOn(instance, 'sortList');
        wrapper.find('#byStartDate').simulate('click');
        expect(instance.sortList).toHaveBeenCalledWith(key);
      })
    
      it('should click sortBy endDate', () => {
        const key = "endDate";
        const wrapper = shallow(<AddProject key />)
        const instance = wrapper.instance();
        jest.spyOn(instance, 'compareBy');
        const button = wrapper.find('#byEndDate')
        button.simulate('click')
        expect(instance.compareBy).toHaveBeenCalledWith(key);
      })
    
      it('should click sortBy Priority', () => {
        const key = "priority";
        const wrapper = shallow(<AddProject key />)
        const instance = wrapper.instance();
        jest.spyOn(instance, 'compareBy');
        const button = wrapper.find('#byPriority')
        button.simulate('click')
        expect(instance.compareBy).toHaveBeenCalledWith(key);
      })

      it('should click sortBy Completed', () => {
        const key = "status";
        const wrapper = shallow(<AddProject key />)
        const instance = wrapper.instance();
        jest.spyOn(instance, 'compareBy');
        const button = wrapper.find('#byCompleted')
        button.simulate('click')
        expect(instance.compareBy).toHaveBeenCalledWith(key);
      })
    
})