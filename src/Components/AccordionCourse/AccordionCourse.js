import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import './AccordionCourse.css'
import AccordionItem from './AccordionItem/AccordionItem';

export default function AccordionCourse() {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>معرفی دوره</Accordion.Header>
                <Accordion.Body>
                    <AccordionItem/>
                    <AccordionItem/>
                    <AccordionItem/>
                </Accordion.Body>
                <Accordion.Body>
                    <AccordionItem/>
                    <AccordionItem/>
                    <AccordionItem/>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>معرفی دوره</Accordion.Header>
                <Accordion.Body>
                    <AccordionItem/>
                    <AccordionItem/>
                    <AccordionItem/>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
