import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const NotificationSonnar = ({ message, type, url, userId }) => {
    const navigate = useNavigate();

    useEffect(() => {
        toast(message || "No Message", {
            description: message || "No Message",
            action: {
                label: "Open",
                onClick: () => navigate(url || '/'),
            },
        });
    }, [message, url, navigate]);

    return null;
};

export default NotificationSonnar;
