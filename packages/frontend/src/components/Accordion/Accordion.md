# Accordion

Accordion component to expand or collapse content

### Usage

```jsx
  import { Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle } from '@boldr/ui';

  const Example = () => {
    return (
      <Accordion>
        <AccordionItem>
            <AccordionItemTitle>
               <h1>Anything you'd like</h1>
            </AccordionItemTitle>
            <AccordionItemBody>
                <p>
                    A story you havent told.
                </p>
            </AccordionItemBody>
        </AccordionItem>
        <AccordionItem>
            <AccordionItemTitle>
                <h3>A smaller title</h3>
                <div>With a bit of description</div>
            </AccordionItemTitle>
            <AccordionItemBody>
                <p>
                   The story you just told
                </p>
            </AccordionItemBody>
        </AccordionItem>
    </Accordion>
    )
  }

```


#### Props

**Accordion**   

Name    Type  Definition
--- | --- | ----
isAccordion | boolean | Should it expand/collapse like an accordion
children | ReactChildren | nested accordion elements
className | string | custom css class name
onChange | function | triggered on expand/collapse

