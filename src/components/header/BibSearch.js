import React, { useState, useEffect, useReducer } from 'react'
import { Form, FormGroup, Button, FormControl, Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { saveRecordsOnStore } from '../../actions/ajax';
import { apiClient } from '../../common/apiClient';
import './BibSearch.scss';

const reducer = (state, action) => {
    switch (action.type) {
        case 'options':
            return action.data;
        case "reset":
            return [];
        default:
            throw state;
    }
}

const isEngText = (text) => {
    return /.*[a-zA-Z]/.test(text);
}

const BibSearch = ({ activeBiblistData, saveRecordsOnStore }) => {
    const [isVisible, setVisible] = useState(false);
    const [isEng, setIsEng] = useState(false);
    const [options, setOptions] = useReducer(reducer, []);

    let loading = false;
    let timeout = false;

    const getSearchedValues = async (value) => {
        let data = await apiClient(`/biblioRecords/Bibsearch.php?q=${value}`, "get", {});
        data = data || [];
        const uniqueValues = [];
        data.forEach((result, i) => {
            if (!uniqueValues.some(u => u.name == result.title)) {
                uniqueValues.push({
                    key: result.title + i,
                    name: result.title,
                    data: result
                })
            }
        })
        setVisible(true);
        setOptions({ type: "options", data: uniqueValues });
        setIsEng(isEngText(value));
        return uniqueValues;
    }

    useEffect(async () => {
        loading = true;
        setTimeout(async () => {
            await getSearchedValues();
            loading = false;
        }, 500)
    }, [])

    const onChange = async (e) => {
        await getSearchedValues(e.target.value);
    }

    const addBIb = (data) => {
        (async () => {
            if (data) {
                data["userid"] = Number(activeBiblistData.userid);
                data["BiblistID"] = Number(activeBiblistData.id);
                const response = await apiClient(`/biblioRecords/Bibsearch.php`, "post", data);
                if (response && response.length > 0) {
                    setVisible(false);
                    saveRecordsOnStore(activeBiblistData.userid, response);
                }
            }
        })()

    }


    return (
        <div>
            <Form>
                <FormGroup>
                    <FormControl
                        id="search"
                        onChange={async (e) => await onChange(e)}
                        name="bibsearch"
                        placeholder="חיפוש מאמר"
                        type="text"
                    />
                </FormGroup>
            </Form>
            <Row>
                <Col md="2"></Col>
                <Col md="10">
                    {isVisible && options.length > 0 && <div id="searchArea" style={{ background: 'white' }}>
                        <ul style={{ listStyle: 'none' }}>
                            {
                                options.map((item, index) => (
                                    <li style={{
                                        textAlign: isEng ? 'left' : 'right',
                                        direction: isEng ? 'ltr' : 'rtl'
                                    }} key={item.key}>
                                        <span>{index + 1}: {item.name} </span>
                                        <Button
                                            onClick={() => addBIb(item.data)}
                                            style={{
                                                textAlign: isEng ? 'right' : 'left',
                                            }}>הוסף</Button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>}
                </Col>
            </Row>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        activeBiblistData: state.activeBiblist,
    };
};

export default connect(mapStateToProps, { saveRecordsOnStore })(BibSearch);
