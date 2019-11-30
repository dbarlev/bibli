import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Header from "../header/Header";
import Footer from "../footer/Footer";

class Takanon extends Component {
  render() {
    return (
      <Grid fluid id="takanon">
        <Header />
        <Row>
        <Col md={6} mdOffset={3}>
            <h1>תנאי שימוש באתר bibli.co.il</h1>
          </Col>
        </Row>
        <Row>
        <Col md={6} mdOffset={3}>
            <div>
              <p>
                אתר ביבלי (bibli.co.il) נוצר על מנת לשפר את איכות העבודות של
                סטודנטים על ידי כך שהוא מאפשר להם להשקיע את זמנם ומרצם בכתיבת
                העבודות ולא בניתוח הפרטים הטכניים. האתר נוצר עבור ובשביל
                הסטודנטים, מתוך כוונה טובה לאפשר להם לקצר את הליך כתיבת
                הביבליוגרפיה. עם זאת, אינו לוקח כל אחריות בנוגע לשימוש שנעשה
                ברשומות הביבליוגרפיות ו/או כל הורדת ציון שנעשה בגין השימוש באתר.
                כל העושה שימוש באתר, עושה זאת על אחריותו בלבד. עצם השימוש באתר
                מביע הסכמה לשורות הרשומות מעלה. הרשומות הביבליוגרפיות באתר זה
                נערכו לפי כללי ה APA מהדורה שישית שיצאה לאור בשנת 2010. שימוש
                מהנה.
            </p>
              <ol>
                <li>
                  השימוש באתר על תכניו והשירותים הניתנים בו, מוצעים לך בכפוף
                  לקבלתך את כל התנאים הכלולים בתקנון זה.
              </li>
                <li>
                  הגלישה באתר ו/או הרשמתך לקבלת שירותיו, ייחשבו להסכמה מצדך לתנאים
                  אלה.
              </li>
                <li>
                  הנהלת האתר רשאית להשעות, לחסום או להפסיק לאלתר את גישת הגולש
                  לשירות אם יפר את תנאי התקנון.
              </li>
                <li>הנהלת האתר רשאית לעדכן את תנאי התקנון מעת לעת.</li>
                <li>אין לעשות באתר או באמצעותו כל שימוש למטרות בלתי חוקיות.</li>
                <li>
                  אין לרשום אדם אחר שלא בהסכמתו ו/או ללא נוכחותו מול המסך בשעת
                  הרישום ולאחר שהוסברו לו כל תנאי תקנון זה.
              </li>
                <li>
                  הרישום באתר הוא לשימוש האישי והבלעדי של הגולש אשר אינו רשאי
                  להעביר את הרשאת השימוש לאדם אחר כלשהו. חובה מיוחדת לדייק לחלוטין
                  בכל הפרטים האישיים הנדרשים לצורך הרישום ולצורך הקשר השוטף עם
                  המנוי.
              </li>
                <li>
                  הנך אחראי באופן בלעדי לנכונות המידע אותו תפרסם או תעביר באמצעות
                  האתר. הנהלת האתר אינה מקבלת על עצמה כל אחריות לתכנים המפורסמים.
              </li>
                <li>
                  הנהלת האתר אינה מקבלת על עצמה אחריות על הורדת ציון בגין רשומה
                  ביבליוגרפית לא נכונה, אנו ממליצים להתייעץ עם גורם אקדמי מוסמך
                  לפני השימוש באתר.
              </li>
                <li>
                  שום גוף אקדמי או חינוכי עומדים מאחורי או מסייעים במימון האתר.
              </li>
                <li>
                  בכוונת הנהלת האתר כי האתר ושירותיו יהיו זמינים בכל עת. יחד עם
                  זאת אין ביכולת הנהלת האתר להתחייב לזמינות רצופה ללא תקלות וללא
                  "נפילות". כמו כן רשאית הנהלת האתר להפסיק את השימוש באתר מעת לעת
                  לצורכי תחזוקתו וארגונו. לא יינתן כל פיצוי כספי/זיכוי בשל תקלות
                  או הפסקות בשירות.
              </li>
                <li>
                  כל זכויות הקניין הרוחני וזכויות היוצרים בקשר לאתר הם של הנהלת
                  האתר.
              </li>
                <li>
                  הנהלת האתר אינה אחראית לתוכן מודעות הפרסום באתר, "באנרים" או לכל
                  חומר פרסומי באתר. האחריות לכך על המפרסמים בלבד.
              </li>
                <li>
                  הימצאותם של קישורים ("לינקים") לאתרים אחרים אינם מהווים ערובה
                  לתכנים באתרים אלה מבחינת מהימנותם, שלמותם, או מכל בחינה אחרת.
              </li>
              </ol>
            </div>
          </Col>
        </Row>

        <Footer />
      </Grid>
    );
  }
}

export default Takanon;