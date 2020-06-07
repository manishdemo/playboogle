import React from "react";

import BoogleBoard from "../../../../app/javascript/components/common/BoogleBoard";
import {describe, expect, it} from "@jest/globals";
import {mount, shallow} from "enzyme";

describe('BoogleBoard', () => {
    it('should render correctly', () => {
        const component = shallow(<BoogleBoard boogleString="ABCDEFGHIJKLMNOP"/> );
        expect(component).toMatchSnapshot();
    });

    it('should change values in each square as per provided props', () => {
        const props = {
                boogleString: "MANISHBOOGLETEST"
            };
        const boogleBoardWrapper = mount(<BoogleBoard {...props} />);
        expect(boogleBoardWrapper.find('.square').first().text()).toEqual('M');
        expect(boogleBoardWrapper.find('.square').at(1).text()).toEqual('A');
        expect(boogleBoardWrapper.find('.square').at(15).text()).toEqual('T');
        boogleBoardWrapper.unmount();
    });

});