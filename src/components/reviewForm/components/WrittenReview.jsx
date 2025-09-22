import { useState, useEffect } from "react";
import { Consent } from "./Consent";
import { SubmitFormReview } from "./SubmitFormReview";


export const WrittenReview = ({ writtenReviewText, onChange, onBack, onNext, formData }) => {


    const [writtenReviewInput, setWrittenReviewInput] = useState(writtenReviewText); /* to recover data onBack: useState(writtenReviewText) */

    /* CONSENT BUTTON */
    const [checked, setChecked] = useState(false);

    const [btnNextBlocked, setBtnNextBlocked] = useState(true);



    const handleInputText = (e) => {
        e.preventDefault();
        const value = e.target.value;

        setWrittenReviewInput(value);

        setBtnNextBlocked(true);
    }

    useEffect(() => {

        onChange("writtenReview", writtenReviewInput);

        if (writtenReviewInput.length < 0 && !checked) setBtnNextBlocked(true);
        if (writtenReviewInput.length > 0 && checked) setBtnNextBlocked(false);



    }, [writtenReviewInput, setBtnNextBlocked, checked])


    /* RECOVER DATA WHEN ON BACK */
    useEffect(() => {

        if (writtenReviewText.length > 0) setWrittenReviewInput(writtenReviewText);
        if (writtenReviewText.length > 0 && checked) setBtnNextBlocked(false);


    }, [])


    return (
        <>
            <div className="flex flex-col items-center justify-center p-3">

                <div>
                    <h1 className="text-2xl text-center"
                    >
                        Escribe una reseña
                    </h1>
                </div>
                <div>
                    <p className="text-gray-400 text-center p-2"
                    >
                        Escribe algo que ayude a otros. ¿Qué te habría gustado saber?
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center">

                    <div className="w-[20rem] h-[22rem] rounded-[3rem] overflow-hidden">

                        <textarea
                            onChange={handleInputText}
                            value={writtenReviewInput}
                            placeholder="Escribe algo que sea realmente constructivo..."
                            className="text-xl w-full h-full bg-white border border-gray-200 px-6 py-5 focus:outline-none focus:ring-2 focus:ring-gray-400  text-gray-600 align-top rounded-[3rem] resize-none overflow-y-scroll
                        
                                        /* WebKit */
                                        [&::-webkit-scrollbar]:w-2
                                        [&::-webkit-scrollbar-track]:bg-transparent
                                        [&::-webkit-scrollbar-thumb]:bg-[#676767]
                                        [&::-webkit-scrollbar-thumb]:rounded-full
                                        
                                        /* Firefox */
                                        [scrollbar-width:thin] 
                                        [scrollbar-color:#676767_transparent]
                                        
                                        "
                        ></textarea>

                    </div>

                </div>
                <div>
                    <Consent
                        checked={checked}
                        setChecked={setChecked}
                        setBtnNextBlocked={setBtnNextBlocked}
                    />
                </div>

                <div>
                    <div className="fixed bottom-0 left-0 w-full z-10 bg-white/1 backdrop-blur flex items-center justify-center py-1 gap-20">

                        <button
                            className="rounded-full bg-white text-[#2D2D2D] w-[100px] h-[50px]"
                            type="button"
                            onClick={onBack}
                        >
                            Atrás
                        </button>

                        <SubmitFormReview
                            checked={checked}
                            writtenReviewInput={writtenReviewInput}

                            onNext={onNext}
                            btnNextBlocked={btnNextBlocked}

                            formData={formData}
                        />

                    </div>
                </div>

            </div >

        </>
    )
}

