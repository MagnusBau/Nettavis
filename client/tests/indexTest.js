// @flow
import * as React from 'react';
import { Scroll, Kategorier } from '../src/index.js';
import { shallow, mount } from 'enzyme';
import {Artikkel, ArtikkelService} from "../src/Service";

describe('Scroll test', () => {
    const wrapper = shallow(<Scroll/>);


    it('initially', () => {
        let instance = Scroll.instance();
        expect(typeof instance).toEqual('object');
        jest.spyOn(ArtikkelService, 'getSiste').mockResolvedValue([]);
        wrapper.update();
        if (instance) expect(wrapper.debug()).toMatchSnapshot();
    });

    it('after load', () => {
        // $flow-disable-line
        let ArtikkelList: Artikkel[] = [new Artikkel("test", "test", "test", "test", 1, 1, "test")];
        jest.spyOn(ArtikkelService, 'getSiste').mockResolvedValue(ArtikkelList);
        wrapper.update();
        let instance = Scroll.instance();
        expect(typeof instance).toEqual('object');
        if (instance) {
            instance.forceUpdate();
            instance.siste = ArtikkelList;
            expect(wrapper.debug()).toMatchSnapshot();
        }
    });
});

describe('Kategorier test', () => {
    const wrapper = shallow(<Kategorier/>);


    it('initially', () => {
        let instance = Kategorier.instance();
        expect(typeof instance).toEqual('object');
        jest.spyOn(ArtikkelService, 'getArticleBycat').mockResolvedValue([]);
        wrapper.update();
        if (instance) expect(wrapper.debug()).toMatchSnapshot();
    });

    it('after load', () => {
        // $flow-disable-line
        let ArtikkelList: Artikkel[] = [new Artikkel("test", "test", "test", "test", 1, 1, "test")];
        jest.spyOn(ArtikkelService, 'getArticleBycat').mockResolvedValue(ArtikkelList);
        wrapper.update();
        let instance = Kategorier.instance();
        expect(typeof instance).toEqual('object');
        if (instance) {
            instance.forceUpdate();
            instance.artikler = ArtikkelList;
            expect(wrapper.debug()).toMatchSnapshot();
        }
    });
});