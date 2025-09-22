

export const ProgressBar = ({ step }) => {

    return (
        <>
            <div className="absolute top-0 inset-x-0 mx-auto flex w-[350px] space-x-1 pt-1">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className={`flex-1 h-1 ${i < step ? "bg-[#2D2D2D]" : "bg-white"}`}
                    />
                ))}
            </div>
            {/* 
                	•	i = 0 → 0 < 3 → true → clase = bg-black.
                    •	i = 1 → 1 < 3 → true → clase = bg-black.
                    •	i = 2 → 2 < 3 → true → clase = bg-black.
                    •	i = 3 → 3 < 3 → false → clase = bg-bg-white.
                    •	i = 4, 5, 6 → también false → bg-bg-white.
            */}
        </>
    )
}

