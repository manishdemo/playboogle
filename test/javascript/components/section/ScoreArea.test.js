import React from "react";

import ScoreArea from "../../../../app/javascript/components/section/ScoreArea";
import {describe, expect, it} from "@jest/globals";
import {shallow, render} from "enzyme";

describe('ScoreArea', () => {
    it('should render correctly', () => {
        const history = {
            "cat": 1,
            "dog":1,
            "zebra": 2
        };

        const component = shallow(<ScoreArea history={history} /> );
        expect(component).toMatchSnapshot();
    });

    it('should have number of displayed words as per the provided input ', () => {
        const history = {
            "cat": 1,
            "dog":1,
            "zebra": 2
        };

        const wrapper = render(<ScoreArea history={history} /> );
        expect(wrapper.find('tr')).toHaveLength(Object.keys(history).length+1);
    });

});