import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {
  init,
  expectSuggestions,
  expectFocusedSuggestion,
  clickSuggestion,
  focusInput,
  blurInput,
  clickEnter,
  clickDown,
  clickUp,
  focusAndSetInputValue
} from '../helpers';
import AutosuggestApp from './AutosuggestApp';

const allSuggestions = [
  'C', 'C#', 'C++', 'Clojure', 'Elm', 'Go', 'Haskell', 'Java',
  'Javascript', 'Perl', 'PHP', 'Python', 'Ruby', 'Scala'
];

describe('Autosuggest with alwaysRenderSuggestions={true}', () => {
  beforeEach(() => {
    const app = TestUtils.renderIntoDocument(React.createElement(AutosuggestApp));
    const container = TestUtils.findRenderedDOMComponentWithClass(app, 'react-autosuggest__container');
    const input = TestUtils.findRenderedDOMComponentWithTag(app, 'input');

    init({ app, container, input });
  });

  describe('initially', () => {
    it('should render suggestions', () => {
      expectSuggestions(allSuggestions);
    });
  });

  describe('when empty input is focused', () => {
    it('should render suggestions', () => {
      focusInput();
      expectSuggestions(allSuggestions);
    });
  });

  describe('when empty input is blurred', () => {
    it('should render suggestions', () => {
      focusInput();
      blurInput();
      expectSuggestions(allSuggestions);
    });
  });

  describe('when typing and matches exist', () => {
    beforeEach(() => {
      focusAndSetInputValue('e');
    });

    it('should render suggestions', () => {
      expectSuggestions(['Elm']);
    });

    it('should render suggestions when input is blurred', () => {
      blurInput();
      expectSuggestions(['Elm']);
    });
  });

  describe('when pressing Down', () => {
    it('should focus on the first suggestion', () => {
      focusAndSetInputValue('p');
      clickDown();
      expectFocusedSuggestion('Perl');
    });
  });

  describe('when pressing Up', () => {
    it('should focus on the last suggestion', () => {
      focusAndSetInputValue('p');
      clickUp();
      expectFocusedSuggestion('Python');
    });
  });

  describe('when pressing Enter', () => {
    beforeEach(() => {
      focusAndSetInputValue('p');
    });

    it('should not hide suggestions if there is a focused suggestion', () => {
      clickDown();
      clickEnter();
      expectSuggestions(['Perl']);
    });

    it('should not hide suggestions if there is no focused suggestion', () => {
      clickEnter();
      expectSuggestions(['Perl', 'PHP', 'Python']);
    });
  });

  describe('when suggestion is clicked', () => {
    it('should not hide suggestions', () => {
      focusAndSetInputValue('p');
      clickSuggestion(1);
      expectSuggestions(['PHP']);
    });
  });
});
