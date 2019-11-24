// @flow
import * as React from 'react';
import { Scroll, Kategorier, Nyheter, artikkelService } from '../src/index.js';
import { shallow, mount } from 'enzyme';
import {Artikkel} from "../src/Service";

describe('Scroll test', () => {
    const wrapper = shallow(<Scroll/>);


    it('initially', () => {
        let instance = Scroll.instance();
        expect(typeof instance).toEqual('object');
        jest.spyOn(artikkelService, 'getSiste').mockResolvedValue([]);
        wrapper.update();
        if (instance) expect(wrapper.debug()).toMatchSnapshot();
    });

    it('after load', () => {
        // $flow-disable-line
        let ArtikkelList: Artikkel[] = [new Artikkel("test", "test", "test", "test", '1', '1', "test")];
        ArtikkelList[0].id = 1;
        jest.spyOn(artikkelService, 'getSiste').mockResolvedValue(ArtikkelList);
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
    const wrapper = shallow(<Kategorier match={{params: {id: 1}}}/>);


    it('initially', () => {
        let instance = Kategorier.instance();
        expect(typeof instance).toEqual('object');
        jest.spyOn(artikkelService, 'getArticleBycat').mockResolvedValue([]);
        wrapper.update();
        if (instance) expect(wrapper.debug()).toMatchSnapshot();
    });

    it('after load', () => {
        // $flow-disable-line
        let ArtikkelList: Artikkel[] = [new Artikkel("test", "test", "test", "test", '1', '1', "test")];
        ArtikkelList[0].id = 1;
        jest.spyOn(artikkelService, 'getArticleBycat').mockResolvedValue(ArtikkelList);
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

describe('Nyheter test', () => {
    const wrapper = shallow(<Nyheter/>);


    it('initially', () => {
        let instance = Nyheter.instance();
        expect(typeof instance).toEqual('object');
        jest.spyOn(artikkelService, 'getNyheter').mockResolvedValue([]);
        wrapper.update();
        if (instance) expect(wrapper.debug()).toMatchSnapshot();
    });

    it('after load', () => {
        // $flow-disable-line
        let ArtikkelList: Artikkel[] = [new Artikkel("test", "test", "test", "test", '1', '1', "test")];
        ArtikkelList[0].id = 1;
        jest.spyOn(artikkelService, 'getNyheter').mockResolvedValue(ArtikkelList);
        wrapper.update();
        let instance = Nyheter.instance();
        expect(typeof instance).toEqual('object');
        if (instance) {
            instance.forceUpdate();
            instance.artikler = ArtikkelList;
            expect(wrapper.debug()).toMatchSnapshot();
        }
    });
});