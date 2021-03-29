import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from "./App";
import Home from "./pages/home";
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor } from "@testing-library/react";
import { mount } from 'enzyme';
import { testData } from './test_data';

Enzyme.configure({ adapter: new Adapter() })

describe('render', () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Router><App /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('Match Snap shot', () => {
    const tree = renderer
      .create(<Router><Home /></Router>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('input', () => {
  const wrapper = mount(<Router><Home /></Router>); 

  it('input button should be present', () => {
    expect(wrapper.find('#fileUpload').length).toEqual(1); 
  });
});

describe('simulate button press', () => {
  let file;

  beforeEach(() => {
    file = new File([testData], 'server.log', { type: 'file/log' });
  });

  it('cover photo upload', async () => {
    const { getByTestId } = render(<Router><Home /></Router>);

    let uploader = getByTestId('fileUpload');

    await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file] },
      })
    );
    let fileUpload = document.getElementById('fileUpload');
    expect(fileUpload.files[0].name).toBe('server.log');
    expect(fileUpload.files.length).toBe(1);
  });
})