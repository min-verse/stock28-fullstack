import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EditProfileForm from "../EditProfileForm";
import DeleteForm from "../DeleteForm";
import DoughnutChart from "../DoughnutChart";
import { SettingsSuggestRounded } from "@mui/icons-material";
import { setUseProxies } from "immer";


function EditProfileMainContent() {

    const [showDelete, setShowDelete] = useState(false);

    function handleShow(){
        const newBool = !showDelete;
        setShowDelete(newBool);
    }

    return <main>
        <Container className="stock-container">
            <Row style={{ padding: 20 }}>
                <Col xs={4}>
                    <h2 className="section-headers">Edit Your Information</h2>
                    <EditProfileForm handleShow={handleShow} showDelete={showDelete}/>
                </Col>
                <Col xs={8}>
                   {showDelete && <DeleteForm handleShow={handleShow} />}
                </Col>
            </Row>
        </Container>
    </main>;
}

export default EditProfileMainContent;