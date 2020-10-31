import React, { } from 'react';
import { Image, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import researcher from '../../img/researcher.png';
import student from '../../img/student.png';
import free from '../../img/guest.png';
import "./Packages.scss";

const data = {
    free: {
        name: "free",
        price: 0,
        priceComponent: () => <div><span>ללא עלות</span></div>,
        period: "",
        src: free,
        lists: 1,
        items: 7,
    },
    student: {
        name: "student",
        price: 8,
        priceComponent: () => <div><span className="smallNum bold">₪</span><span>{data.student.price}</span></div>,
        period: "לחודש",
        src: student,
        lists: "ללא הגבלה",
        items: 200
    },
    researcher: {
        name: "researcher",
        price: 45,
        priceComponent: () => <div><span className="smallNum bold">₪</span><span>{data.researcher.price}</span></div>,
        period: "לחודש",
        src: researcher,
        lists: "ללא הגבלה",
        items: "ללא הגבלה"
    }
};


const PricingTable = ({ onPackageChoosen, upgrade }) => {

    return (
        <div id="pricing-table">
            <ul>
                {
                    Object.entries(data).map(([packageName, value]) => (
                        <PricingItem upgrade={upgrade} onPackageChoosen={onPackageChoosen} packageName={packageName} value={value} />
                    ))
                }
            </ul>
        </div>
    )
}

const PricingItem = ({ packageName, value, onPackageChoosen, upgrade }) => {
    const recomended = packageName === "student";
    const premium = packageName === "researcher";
    const listClassName = recomended ? 'price-recomended' : premium ? 'price-premium' : 'price-regular';
    const currentPackage = upgrade && packageName == "free";
    const currentClassName = currentPackage ? "currentPackage" : "";

    return (
        <li className={`text-center ${listClassName} ${currentClassName}`}>
            {recomended && <div className="recomended-badge">הנבחרת ביותר</div>}
            <div className={recomended && 'recomended-container'}>
                <Image src={value.src} alt="משתמש מסוג אורח" />
                <Row>
                    {value.priceComponent()}
                    <p>{value.period}</p>
                </Row>

                <Row>
                    <p className="large bold">עבודות:</p>
                    <p>{value.lists}</p>
                </Row>
                <Row>
                    <p className="large bold">פריטים ביבליוגרפיים:</p>
                    <p>{value.items}</p>
                </Row>
                <Row>
                    {
                        !currentPackage ?
                            <Button
                                onClick={async () => await onPackageChoosen(value)}
                                bsStyle="primary"
                                className="btn-yellow blue-text">
                                לבחירת התכנית
                            <i className="fas fa-chevron-left btn-yellow"></i>
                            </Button>
                            :
                            <div>חבילה נוכחית</div>
                    }
                </Row>
            </div>
        </li>
    )
}

const mapStateToProps = state => {
    return {
        userPackage: state.userPackage
    }
}

export default connect(mapStateToProps, {})(PricingTable);