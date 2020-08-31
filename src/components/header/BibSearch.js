import React, { Component } from 'react'
import { Form, FormGroup, Button, FormControl, Row, Col, Toast } from 'react-bootstrap';
import { connect } from "react-redux";
import { saveRecordsOnStore } from '../../actions/ajax';
import { apiClient } from '../../common/apiClient';
import { ToastContainer, toast } from 'react-toastify';
import './BibSearch.scss';
import 'react-toastify/dist/ReactToastify.css';

const reducer = (state, action) => {
    switch (action.type) {
        case 'options':
            return [...state, ...action.data];
        case "reset":
            return [];
        default:
            throw state;
    }
}

const isEngText = (text) => {
    return /.*[a-zA-Z]/.test(text);
}

const elipsis = (text, maxLength) => {
    maxLength = maxLength || 30;
    if (text.length > maxLength) {
        text = text.substr(0, maxLength);
        text = isEngText(text) ? `...${text}` : `${text}...`;
    }
    return text;
}

class BibSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            options: [],
            isEng: false,
            lastScrollIndex: 0,
            scrollEventAdded: false,
            currentValue: ""
        };
    }

    async getSearchedValues(value, startIndex) {
        startIndex = startIndex || 0;
        let data = await apiClient(`/biblioRecords/Bibsearch.php?q=${value}&startIndex=${startIndex}`, "get", {});
        data = data || [];
        const uniqueValues = [];
        data.forEach((result, i) => {
            if (!uniqueValues.some(u => u.name == result.title)) {
                let writers = [];
                result.wFname && result.wFname.forEach((f, i) => {
                    writers.push(`${f} ${result.wLname[i]}`)
                });
                uniqueValues.push({
                    key: result.title + i,
                    name: result.title,
                    data: result,
                    writers: writers.join(",")
                })
            }
        })
        this.setState({
            isVisible: true,
            options: uniqueValues,
            isEng: isEngText(value),
        }, () => {
            this.addScrollEvent();
            return uniqueValues;
        });
    }

    async onChange(e) {
        const value = e.target.value;
        if (value.trim() === "") {
            this.clear();
        }
        else {
            this.setState({ currentValue: value });
            await this.getSearchedValues(e.target.value);
        }
    }

    addBIb(data) {
        (async () => {
            if (data) {
                this.setState({ isVisible: false });
                data["userid"] = Number(this.props.activeBiblistData.userid);
                data["BiblistID"] = Number(this.props.activeBiblistData.id);
                const response = await apiClient(`/biblioRecords/Bibsearch.php`, "post", data);
                if (response && response.length > 0) {
                    toast.success('פריט ביבליוגרפי נוסף בהצלחה!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: false,
                    });
                    this.props.saveRecordsOnStore(this.props.activeBiblistData.userid, response);
                    this.highlightSelectedRecord(data.title);
                }
            }
        })()
    }

    highlightSelectedRecord(title) {
        const escapeTitle = escape(title.toLowerCase());
        let limitCounter = 0;
        const interval = setInterval(() => {
            const el = document.querySelector(`[record_name='${escapeTitle}']`);
            if (limitCounter > 50) {
                clearInterval(interval);
            }
            if (el) {
                clearInterval(interval);
                el.style.color = "green";
                setTimeout(() => {
                    el.style.color = "black";
                }, 5000)
            }
            limitCounter++;
        }, 100);
    }

    addScrollEvent() {
        const { options, scrollEventAdded } = this.state;
        if (options && options.length > 0 && options.length < 20 && !scrollEventAdded) {
            this.setState({ scrollEventAdded: true });
            const scrollElement = document.getElementById("searchArea");
            scrollElement && scrollElement.removeEventListener("scroll", this.infantScroll, true);
            scrollElement && scrollElement.addEventListener("scroll", async (e) => await this.infantScroll(e, scrollElement))
        }
    }

    async infantScroll(e, scrollElement) {
        const { lastScrollIndex, options, currentValue } = this.state;
        if (scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight && lastScrollIndex < options.length) {
            this.setState({ lastScrollIndex: options.length });
            await this.getSearchedValues(currentValue, options.length);
        }
    }

    closeByEsc(e) {
        if (e.keyCode === 27) {
            this.clear();
        }
    }

    clear() {
        this.setState({ isVisible: false, options: [], scrollEventAdded: false, currentValue: "" })
    }

    render() {
        const userNotPermited = this.props.userPacakge === "free";
        return (
            <div>
                <Form>
                    <FormGroup>
                        <FormControl
                            id="search"
                            onChange={async (e) => await this.onChange(e)}
                            name="bibsearch"
                            placeholder="חיפוש מאמר"
                            type="text"
                        />
                    </FormGroup>
                </Form>
                <Row>
                    <Col md="2"></Col>
                    <Col md="10">
                        {this.state.isVisible && this.state.options.length > 0 &&
                            <div tabindex="0" onKeyDown={(e) => this.closeByEsc(e)} id="searchArea" style={{ background: 'white' }}>
                                <ul className="searchList" style={{ listStyle: 'none' }}>
                                    {this.state.options.map((item, index) => (
                                        <li className="searchListItem" style={{
                                            textAlign: this.state.isEng ? 'left' : 'right',
                                            direction: this.state.isEng ? 'ltr' : 'rtl'
                                        }} key={item.key}>
                                            <span>{elipsis(item.name, 70)} <p className="writers">{item.writers}</p></span>
                                            {
                                                userNotPermited
                                                    ?
                                                    <Button
                                                        onClick={() => console.log("שדרג")}
                                                        style={{
                                                            textAlign: this.state.isEng ? 'right' : 'left',
                                                        }}>שדרג חבילה</Button>
                                                    :
                                                    <Button
                                                        onClick={() => this.addBIb(item.data)}
                                                        style={{
                                                            textAlign: this.state.isEng ? 'right' : 'left',
                                                        }}>הוסף</Button>
                                            }
                                        </li>
                                    ))
                                    }
                                </ul>
                            </div>}
                    </Col>
                </Row>
                <ToastContainer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeBiblistData: state.activeBiblist,
        userPacakge: state.userPacakge
    };
};

export default connect(mapStateToProps, { saveRecordsOnStore })(BibSearch);
