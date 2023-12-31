import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import './AccordionCourse.css'
import AccordionItem from './AccordionItem/AccordionItem';

export default function AccordionCourse({sessions , IsRegistered , courseName}) {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>معرفی دوره</Accordion.Header>
                <Accordion.Body>
                    {
                        sessions.map((session , index) => (<AccordionItem session={session} index={index} IsRegistered={IsRegistered} courseName={courseName}/>))
                    }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
