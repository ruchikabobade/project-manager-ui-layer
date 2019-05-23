import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import AddUser from './AddUser';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios'

Enzyme.configure({ adapter: new Adapter() });

describe('AddUser', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<AddUser />))

  // it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render a <div/>', () => {
    expect(wrapper.find('div').length).toEqual(24);
  });

  it('should render a <form/>', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('should render a <input/>', () => {
    expect(wrapper.find('input').length).toEqual(5);
  });

  it('should render a <span/>', () => {
    expect(wrapper.find('span').length).toEqual(7);
  });

  it('should render a <button/>', () => {
    expect(wrapper.find('button').length).toEqual(4);
  });

  it('should click sortBy EmployeeId', () => {
    const key = "employeeId";
    const wrapper = shallow(<AddUser key />)
    const instance = wrapper.instance();
    jest.spyOn(instance, 'sortList');
    wrapper.find('button').last().simulate('click');
    expect(instance.sortList).toHaveBeenCalledWith(key);
  })

  it('should click sortBy LastName', () => {
    const key = "lastName";
    const wrapper = shallow(<AddUser key />)
    const instance = wrapper.instance();
    jest.spyOn(instance, 'compareBy');
    const button = wrapper.find('#byLastName')
    button.simulate('click')
    expect(instance.compareBy).toHaveBeenCalledWith(key);
  })

  it('should click sortBy FirstName', () => {
    const key = "firstName";
    const wrapper = shallow(<AddUser key />)
    const instance = wrapper.instance();
    jest.spyOn(instance, 'compareBy');
    const button = wrapper.find('#byFirstName')
    button.simulate('click')
    expect(instance.compareBy).toHaveBeenCalledWith(key);
  })


  it('should call onChangeFirstName', () => {
    const event = {
      target: { value: 'the-value' }
    };
    const wrapper = mount(<AddUser />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'onChangeFirstName');
    wrapper.instance().forceUpdate()
    wrapper.update()
    wrapper.find('input').first().simulate('change', event);
    expect(instance.onChangeFirstName).toHaveBeenCalled();
  });

  it('should call onChangeLastName', () => {
    const event = {
      target: { value: 'the-value' }
    };
    const wrapper = mount(<AddUser />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'onChangeLastName');
    wrapper.instance().forceUpdate()
    wrapper.update()
    const input = wrapper.find('#lastName')
    input.simulate('change', event)
    expect(instance.onChangeLastName).toHaveBeenCalled();
  });

  it('should call onChangeEmployeeId', () => {
    const event = {
      target: { value: 'the-value' }
    };
    const wrapper = mount(<AddUser />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'onChangeEmployeeId');
    wrapper.instance().forceUpdate()
    wrapper.update()
    const input = wrapper.find('#employeeId')
    input.simulate('change', event)
    expect(instance.onChangeEmployeeId).toHaveBeenCalled();
  });

  it('should call onReset', () => {
    const event = {
      target: { value: 'the-value' }
    };
    const wrapper = mount(<AddUser />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'onReset');
    wrapper.instance().forceUpdate()
    wrapper.update()
    const button = wrapper.find('button').first()
    button.simulate('click', event)
    expect(instance.onReset).toHaveBeenCalled();
  });

  it('should call filterList', () => {
    const event = {
      target: { value: 'the-value' }
    };
    const wrapper = mount(<AddUser />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'filterList');
    wrapper.instance().forceUpdate()
    wrapper.update()
    const input = wrapper.find('input').last()
    input.simulate('change', event)
    expect(instance.filterList).toHaveBeenCalled();
  });

  it('should call submitUser', () => {
    const event = {
      target: { value: 'the-value' }
    };
    const wrapper = mount(<AddUser />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'onSubmit');
    wrapper.instance().forceUpdate()
    wrapper.update()
    const input = wrapper.find('#formSubmit')
    input.simulate('submit', event)
    expect(instance.onSubmit).toHaveBeenCalled();
  });

  it('should check that the componentWillMount method is getting called', () => {
    spyOn(AddUser.prototype, 'componentWillMount').and.callThrough();
    const wrapper = mount(<AddUser />);
    expect(wrapper).toBeDefined();
    expect(AddUser.prototype.componentWillMount).toHaveBeenCalledTimes(1);
});

jest.mock('axios');

// it('fetch articles on #componentDidMount', () => {
//   const app = shallow(<AddUser />);
//   app.instance().componentWillMount().then(() => {
//       expect(axios.get).toHaveBeenCalled();
//       expect(axios.get).toHaveBeenCalledWith('articles_url');
//       expect(app.state()).toHaveProperty('users', [
//         { firstName: '', lastName: '', employeeId: '', userId: '' }
//       ]);
//       done();
//     });
// });

it('should fetch a list of tasks', () => {
  const getSpy = jest.spyOn(axios, 'get');
  const toDoListInstance = shallow(
    <AddUser/>
  );
  expect(getSpy).toBeCalled();
});
})