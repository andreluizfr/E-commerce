import './styles.css';
import * as Accordion from '@radix-ui/react-accordion';
import {ReactComponent as ChevronDown} from 'assets/svg/chevron-down.svg';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    setPageState: React.Dispatch<React.SetStateAction<string>>;
}

export default function MenuAccordion (props: Props) : JSX.Element {

    return(
        <div className='MenuAccordion'>
            <Accordion.Root type="single" defaultValue="item-1" className="AccordionRoot" collapsible>
                 
                <Accordion.Item value="item-1" className="AccordionItem">

                    <Accordion.Header className="AccordionHeader">
                        <Accordion.Trigger className='AccordionTrigger' onClick={()=>props.setPageState("Start")}>
                            Início
                        </Accordion.Trigger>
                    </Accordion.Header>

                </Accordion.Item>

                <Accordion.Item value="item-2" className="AccordionItem">

                    <Accordion.Header className="AccordionHeader">
                        <Accordion.Trigger className='AccordionTrigger' onClick={()=>props.setPageState("Products")}>
                            Produtos
                            <ChevronDown className="AccordionChevron" aria-hidden />
                        </Accordion.Trigger>
                    </Accordion.Header>

                    <Accordion.Content className='AccordionContent'>
                        <div className="AccordionContentOptions">
                            <div className="AccordionContentText" onClick={()=>props.setPageState("AddProduct")}> 
                                Adicionar produto
                            </div>
                            <div className="AccordionContentText" onClick={()=>props.setPageState("Collections")}>
                                Coleções
                            </div>
                            <div className="AccordionContentText" onClick={()=>props.setPageState("Coupons")}>
                                Cupons
                            </div>
                        </div>
                    </Accordion.Content>

                </Accordion.Item>

                <Accordion.Item value="item-3" className="AccordionItem">

                    <Accordion.Header className="AccordionHeader">
                        <Accordion.Trigger className='AccordionTrigger' onClick={()=>props.setPageState("Clients")}>
                            Clientes
                        </Accordion.Trigger>
                    </Accordion.Header>

                </Accordion.Item>

                <Accordion.Item value="item-4" className="AccordionItem">

                    <Accordion.Header className="AccordionHeader">
                        <Accordion.Trigger className='AccordionTrigger' onClick={()=>props.setPageState("Orders")}>
                            Pedidos
                            <ChevronDown className="AccordionChevron" aria-hidden />
                        </Accordion.Trigger>
                    </Accordion.Header>

                    <Accordion.Content className='AccordionContent'>
                        <div className="AccordionContentOptions">
                            <div className="AccordionContentText" onClick={()=>props.setPageState("Drafts")}>
                                Rascunhos
                            </div>
                            <div className="AccordionContentText" onClick={()=>props.setPageState("AbandonedCheckouts")}> 
                                Checkouts abandonados
                            </div>
                        </div>
                    </Accordion.Content>

                </Accordion.Item>

                <Accordion.Item value="item-5" className="AccordionItem">

                    <Accordion.Header className="AccordionHeader">
                        <Accordion.Trigger className='AccordionTrigger' onClick={()=>props.setPageState("Analyzes")}>
                            Análises
                            <ChevronDown className="AccordionChevron" aria-hidden />
                        </Accordion.Trigger>
                    </Accordion.Header>

                    <Accordion.Content className='AccordionContent'>
                        <div className="AccordionContentOptions">
                            <div className="AccordionContentText" onClick={()=>props.setPageState("Panels")}>
                                Painéis
                            </div>
                            <div className="AccordionContentText" onClick={()=>props.setPageState("Reports")}> 
                                Relatórios
                            </div>
                        </div>
                    </Accordion.Content>

                </Accordion.Item>

            </Accordion.Root>
        </div>
    );
}
