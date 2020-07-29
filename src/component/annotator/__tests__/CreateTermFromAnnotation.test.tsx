import * as React from "react";
import Term from "../../../model/Term";
import VocabularyUtils from "../../../util/VocabularyUtils";
import {shallow} from "enzyme";
import {CreateTermFromAnnotation} from "../CreateTermFromAnnotation";
import {intlFunctions} from "../../../__tests__/environment/IntlUtil";

describe("CreateTermFromAnnotation", () => {

    const vocabularyIri = VocabularyUtils.create(VocabularyUtils.NS_TERMIT + "test-vocabulary");

    let onClose: () => void;
    let onMinimize: () => void;
    let createTerm: (term: Term) => Promise<any>;
    let onTermCreated: (term: Term) => void;

    let propsFunctions: any;

    beforeEach(() => {
        onClose = jest.fn();
        onMinimize = jest.fn();
        createTerm = jest.fn().mockResolvedValue({});
        onTermCreated = jest.fn();
        propsFunctions = {onClose, onMinimize, createTerm, onTermCreated};
    });

    it("resets state before close", () => {
        const wrapper = shallow<CreateTermFromAnnotation>(<CreateTermFromAnnotation show={true}
                                                                                    vocabularyIri={vocabularyIri} {...propsFunctions} {...intlFunctions()}/>);
        wrapper.setState({iri: "http://test", label: "test"});
        wrapper.instance().onCancel();
        expect(onClose).toHaveBeenCalled();
        expect(wrapper.state().iri).toEqual("");
        expect(wrapper.state().label).toEqual("");
    });

    it("setLabel sets label in state", () => {
        const wrapper = shallow<CreateTermFromAnnotation>(<CreateTermFromAnnotation show={true}
                                                                                    vocabularyIri={vocabularyIri} {...propsFunctions} {...intlFunctions()}/>);
        expect(wrapper.state().label).toEqual("");
        const label = "Test";
        wrapper.instance().setLabel(label);
        expect(wrapper.state().label).toEqual(label);
    });

    it("setDefinition sets definition in state", () => {
        const wrapper = shallow<CreateTermFromAnnotation>(<CreateTermFromAnnotation show={true}
                                                                                    vocabularyIri={vocabularyIri} {...propsFunctions} {...intlFunctions()}/>);
        expect(wrapper.state().definition).toEqual("");
        const definition = "Test definition";
        wrapper.instance().setDefinition(definition);
        expect(wrapper.state().definition).toEqual(definition);
    });

    it("onSave creates new term from current state and saves it", () => {
        const wrapper = shallow<CreateTermFromAnnotation>(<CreateTermFromAnnotation show={true}
                                                                                    vocabularyIri={vocabularyIri} {...propsFunctions} {...intlFunctions()}/>);
        const iri = vocabularyIri + "/term/test-term";
        const label = "Test label";
        const sources = ["source.html", "http://onto.fel.cvut.cz"];
        wrapper.setState({iri, label, sources});
        wrapper.instance().onSave();
        expect(createTerm).toHaveBeenCalled();
        const term = (createTerm as jest.Mock).mock.calls[0][0];
        expect(term).toBeInstanceOf(Term);
        expect(term.iri).toEqual(iri);
        expect(term.label).toEqual(label);
        expect(term.sources).toEqual(sources);
        expect(term.types).toContain(VocabularyUtils.TERM);
        expect((createTerm as jest.Mock).mock.calls[0][1]).toEqual(vocabularyIri);
    });

    it("invokes close and clears state after successful term creation", async () => {
        const wrapper = shallow<CreateTermFromAnnotation>(<CreateTermFromAnnotation show={true}
                                                                                    vocabularyIri={vocabularyIri} {...propsFunctions} {...intlFunctions()}/>);
        wrapper.setState({iri: vocabularyIri + "/term/test-term", label: "Test term"});
        await wrapper.instance().onSave();
        expect(onClose).toHaveBeenCalled();
        expect(wrapper.state().iri).toEqual("");
        expect(wrapper.state().label).toEqual("");
    });

    it("invokes onTermCreated with the new term after successful term creation", async () => {
        const termIri = vocabularyIri + "/term/test-term";
        const termLabel = "Test term";
        const wrapper = shallow<CreateTermFromAnnotation>(<CreateTermFromAnnotation show={true}
                                                                                    vocabularyIri={vocabularyIri} {...propsFunctions} {...intlFunctions()}/>);
        wrapper.setState({iri: termIri, label: termLabel});
        await wrapper.instance().onSave();
        expect(onTermCreated).toHaveBeenCalled();
        const newTerm = (onTermCreated as jest.Mock).mock.calls[0][0];
        expect(newTerm.iri).toEqual(termIri);
        expect(newTerm.label).toEqual(termLabel);
    });
});
