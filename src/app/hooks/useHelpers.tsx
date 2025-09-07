// src/app/hooks/useHelpers.tsx
import { useHomeContext } from '../context/homeContext/homeContext'
import { NotificationType } from '@/types/context'

// Define a generic API response type
type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: { message: string };
};

const useHelpers = () => {
    const {dispatch} = useHomeContext()

    const raiseNotification = <T,>(response: ApiResponse<T>) => {
        const message = response.success ? response.message : response.error?.message || 'An unknown error occurred.';
        const type = response.success ? NotificationType.Success : NotificationType.Failure;
        setTimeout(() => {
            dispatch({
            type: "HANDLE_NOTIFICATION", 
            payload: { isOpen: true, message, notificationType: type }
        });
        }, 1500)
        

        setTimeout(() => {
            dispatch({
                type: "HANDLE_NOTIFICATION", 
                payload: { isOpen: false, message: "", notificationType: NotificationType.Info }
            });
        }, 4000);
    }

    return { raiseNotification };
}

export default useHelpers