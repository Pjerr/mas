import { ToastContainer } from 'react-toastify';

export const Toastify = () => {
    return (
        <ToastContainer
            position="top-right"
            theme="dark"
            autoClose={2200}
            pauseOnHover
        />
    );
};
