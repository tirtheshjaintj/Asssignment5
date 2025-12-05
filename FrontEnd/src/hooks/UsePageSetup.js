import { useEffect } from "react";

const usePageSetup = (title) => {
    useEffect(() => {
        document.title = `Imarticus Learning: ${title}`;
        window.scrollTo(0, 0);
    }, [title]);
};

export default usePageSetup;
