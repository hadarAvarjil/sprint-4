import { useState } from 'react';
import SvgIcon from './SvgIcon.jsx';

export function FAQAccordion() {
    const [activeIndex, setActiveIndex] = useState(null)

    function toggleAccordion(index) {
        setActiveIndex(activeIndex === index ? null : index)
    }

    const faqs = [
        {
            question: "How can we get started?",
            answer: "It's very easy! After ordering my gig, you will see some basic questions where I will determine your exact needs and provide you designs based upon it.",
        },
        {
            question: "What is Source Files and how they are helpful?",
            answer: "Source files are the original files of the logo design by which you can edit/resize the logo to any size without losing quality using the Adobe Illustrator software. They are available in Ai, EPS, PSD, PDF, PNG, SVG formats. I recommend selecting a Standard/Premium package for this benefit.",
        },
        {
            question: "What is Social media kit?",
            answer: "The social media kit includes covers for different social media platforms like Facebook, Twitter, YouTube, and GooglePlus. The logo which I design will be featured on those covers and they are in social media platform-friendly size and dimensions. It is offered in Standard and Premium Package.",
        },
    ]

    return (
        <div className="faq-container">
            <h1 className="faq-title">FAQ</h1>
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className="faq-item"
                >
                    <button
                        className="faq-question"
                        onClick={() => toggleAccordion(index)}
                    >
                        <span>{faq.question}</span>
                        <span className="faq-toggle">
                            {activeIndex === index ? <SvgIcon iconName="arrUP" /> : <SvgIcon iconName="arrdown" />}
                        </span>
                    </button>
                    {activeIndex === index && (
                        <div className={`faq-answer ${activeIndex === index ? 'visible' : ''}`}>
                            {faq.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}