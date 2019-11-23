// @flow
import * as React from 'react';
import { Scroll } from '../src/index.js';
import { shallow, mount } from 'enzyme';
import {Case, caseService} from "../src/services";

describe('NewsFeed test', () => {
    const wrapper = shallow(<PageFeed/>);


    it('initially', () => {
        let instance = PageFeed.instance();
        expect(typeof instance).toEqual('object');
        jest.spyOn(caseService, 'getCasesNew').mockResolvedValue([]);
        wrapper.update();
        if (instance) expect(wrapper.debug()).toMatchSnapshot();
    });

    it('after load', () => {
        // $flow-disable-line
        let caseList: Case[] = [new Case("test", "test", "test", 1, "")];
        jest.spyOn(caseService, 'getCasesNew').mockResolvedValue(caseList);
        wrapper.update();
        let instance = PageFeed.instance();
        expect(typeof instance).toEqual('object');
        if (instance) {
            instance.forceUpdate();
            instance.caseList = caseList;
            expect(wrapper.debug()).toMatchSnapshot();
        }
    });
});