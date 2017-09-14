import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { setOptions } from '@storybook/addon-options';
import {
  withKnobs,
  text,
  number,
  boolean,
  color,
  select,
  array,
  date,
  object,
} from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from './index';

storiesOf('Accordion', module)
  .addDecorator(withKnobs)
  .add(
    'simple info',
    withInfo({
      text: 'String or React Element with docs about my component',
    })(() => {
      return (
        <Accordion isAccordion={boolean('isAccordion', true)}>
          <AccordionItem
            onClick={action('Clicked Accordion')}
            isExpanded={boolean('isExpanded1', true)}>
            <AccordionItemTitle>
              <h1>Anything you'd like</h1>
            </AccordionItemTitle>
            <AccordionItemBody isExpanded={boolean('isExpanded1', true)}>
              <p>A story you havent told.</p>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem
            onClick={action('Clicked Accordion')}
            isExpanded={boolean('isExpanded2', true)}>
            <AccordionItemTitle>
              <h3>A smaller title</h3>
              <div>With a bit of description</div>
            </AccordionItemTitle>
            <AccordionItemBody isExpanded={boolean('isExpanded2', true)}>
              <p>The story you just told</p>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      );
    }),
    { inline: true },
  )
  .add('a complex', () => (
    <Accordion accordion={false}>
      <AccordionItem>
        <AccordionItemTitle>
          <h3 className="u-position-relative">
            Accordion
            <div className="boldr-accordion__arrow" role="presentation" />
          </h3>
        </AccordionItemTitle>
        <AccordionItemBody>
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>type</th>
                <th>default</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>accordion</td>
                <td>Boolean</td>
                <td>true</td>
                <td>Open only one item at a time or not</td>
              </tr>
              <tr>
                <td>onChange</td>
                <td>Function(keys)</td>
                <td>noop</td>
                <td>Triggered on change (open/close items)</td>
              </tr>
              <tr>
                <td>className</td>
                <td>String</td>
                <td>accordion</td>
                <td>CSS class(es) applied to the component</td>
              </tr>
            </tbody>
          </table>
        </AccordionItemBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemTitle>
          <h3 className="u-position-relative">
            AccordionItem
            <div className="boldr-accordion__arrow" role="presentation" />
          </h3>
        </AccordionItemTitle>
        <AccordionItemBody>
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>type</th>
                <th>default</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>expanded</td>
                <td>Boolean</td>
                <td>false</td>
                <td>Expands this item on first render</td>
              </tr>
              <tr>
                <td>className</td>
                <td>String</td>
                <td>accordion__item</td>
                <td>CSS class(es) applied to the component</td>
              </tr>
            </tbody>
          </table>
        </AccordionItemBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemTitle>
          <h3 className="u-position-relative">
            AccordionItemTitle
            <div className="boldr-accordion__arrow" role="presentation" />
          </h3>
        </AccordionItemTitle>
        <AccordionItemBody>
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>type</th>
                <th>default</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>className</td>
                <td>String</td>
                <td>accordion__title</td>
                <td>CSS class(es) applied to the component</td>
              </tr>
            </tbody>
          </table>
        </AccordionItemBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemTitle>
          <h3 className="u-position-relative">
            AccordionItemBody
            <div className="boldr-accordion__arrow" role="presentation" />
          </h3>
        </AccordionItemTitle>
        <AccordionItemBody>
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>type</th>
                <th>default</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>className</td>
                <td>String</td>
                <td>accordion__body</td>
                <td>CSS class(es) applied to the component</td>
              </tr>
              <tr>
                <td>hideBody ClassName</td>
                <td>String</td>
                <td>accordion__body--hidden</td>
                <td>Class name for hidden body state</td>
              </tr>
            </tbody>
          </table>
        </AccordionItemBody>
      </AccordionItem>
    </Accordion>
  ));
