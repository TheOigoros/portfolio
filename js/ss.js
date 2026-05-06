var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { SHARED_STYLES } from '../css/shared-css.js';
import { openSearchHelpDialog } from './chromedash-search-help-dialog.js';
import { QUERIABLE_FIELDS } from './queriable-fields.js';
function convertQueriableFieldToVocabularyItems(qf) {
    if (qf.choices === undefined) {
        return [{ group: qf.name, name: qf.name + ':', doc: qf.doc }];
    }
    const result = [];
    for (const ch in qf.choices) {
        const label = qf.choices[ch][1];
        result.push({
            group: qf.name,
            name: qf.name + ':"' + label + '"',
            doc: qf.doc,
        });
    }
    return result;
}
const VOCABULARY = QUERIABLE_FIELDS.map(convertQueriableFieldToVocabularyItems).flat();
let ChromedashFeatureFilter = class ChromedashFeatureFilter extends LitElement {
    constructor() {
        super(...arguments);
        this.typeaheadRef = createRef();
        this.query = '';
        this.handleDocumentKeyUp = (e) => {
            const inInputContext = e
                .composedPath()
                .some(el => ['INPUT', 'TEXTAREA', 'SL-POPUP', 'SL-DIALOG'].includes(el.tagName));
            if (e.key === '/' && !inInputContext) {
                e.preventDefault();
                e.stopPropagation();
                (this.typeaheadRef?.value).focus();
            }
        };
    }
    _fireEvent(eventName, detail) {
        const event = new CustomEvent(eventName, {
            bubbles: true,
            composed: true,
            detail,
        });
        this.dispatchEvent(event);
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('keyup', this.handleDocumentKeyUp);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('keyup', this.handleDocumentKeyUp);
    }
    handleSearchClick() {
        const typeahead = this.typeaheadRef.value;
        if (!typeahead)
            return;
        typeahead.hide();
        const newQuery = typeahead.value.trim();
        this._fireEvent('search', { query: newQuery });
    }
    static get styles() {
        return [
            ...SHARED_STYLES,
            css `
        sl-icon-button {
          font-size: 1.6rem;
          margin: 0 !important;
        }
      `,
        ];
    }
    showHelp(event) {
        event.stopPropagation();
        const typeahead = this.typeaheadRef.value;
        if (!typeahead)
            return;
        typeahead.hide();
        openSearchHelpDialog();
    }
    render() {
        return html `
      <chromedash-typeahead
        ${ref(this.typeaheadRef)}
        value=${this.query}
        placeholder="Search"
        .vocabulary=${VOCABULARY}
        @sl-change=${this.handleSearchClick}
      >
        <sl-icon-button
          library="material"
          name="search"
          slot="prefix"
          @click="${this.handleSearchClick}"
        >
        </sl-icon-button>
        <sl-icon-button
          library="material"
          name="help_20px"
          slot="suffix"
          @click="${this.showHelp}"
        >
        </sl-icon-button>
      </chromedash-typeahead>
    `;
    }
};
__decorate([
    property({ type: String })
], ChromedashFeatureFilter.prototype, "query", void 0);
ChromedashFeatureFilter = __decorate([
    customElement('chromedash-feature-filter')
], ChromedashFeatureFilter);
