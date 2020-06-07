import React from "react";

import PlayerInput from "../../../../app/javascript/components/common/PlayerInput";
import {describe, expect, it} from "@jest/globals";
import {mount, shallow} from "enzyme";

describe('PlayerInput', () => {
    it('should render correctly', () => {
        const component = shallow(<PlayerInput inputWord="word" /> );
        expect(component).toMatchSnapshot();
    });

    it('handleWordSubmit should be called when the word submit button is pressed, while PlayerInput is in ' +
        'active mode', () => {
        const handleWordSubmitFn = jest.fn();
        const component = mount(<PlayerInput onWordSubmit={handleWordSubmitFn} isGameStarted={true}/>);
        component.find('.word-submit').first().simulate('submit');
        expect(handleWordSubmitFn).toHaveBeenCalled();
        component.unmount();

    });

    it('handleWordSubmit should not be called when the word submit button is pressed, while PlayerInput is ' +
        'in deactivated mode', () => {
        const handleWordSubmitFn = jest.fn();
        const component = mount(<PlayerInput onWordSubmit={handleWordSubmitFn} isGameStarted={false}/>);
        component.find('.word-submit').first().simulate('submit');
        expect(handleWordSubmitFn).toHaveBeenCalledTimes(0);
        component.unmount();
    });

});