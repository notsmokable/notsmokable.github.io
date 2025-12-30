import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';

const ContactModal = ({ isOpen, onClose }) => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const mailtoLink = `mailto:notsmoke21@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 9998,
                            cursor: 'pointer'
                        }}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, x: "-50%", y: "-50%" }}
                        animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
                        exit={{ scale: 0.8, opacity: 0, x: "-50%", y: "-50%" }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            width: '90%',
                            maxWidth: '500px',
                            backgroundColor: '#050505',
                            border: '2px solid var(--color-primary)',
                            boxShadow: '8px 8px 0 var(--color-secondary)',
                            padding: '2rem',
                            zIndex: 9999,
                            color: 'white'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <GlitchText text="CONTACT_LINK" as="h3" style={{ fontSize: '1.5rem', margin: 0 }} />
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--color-nintendo)',
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                [X]
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontFamily: 'monospace', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>SUBJECT //</label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    style={{
                                        width: '100%',
                                        background: '#111',
                                        border: '1px solid #333',
                                        color: 'white',
                                        padding: '0.8rem',
                                        fontFamily: 'monospace',
                                        outline: 'none'
                                    }}
                                    placeholder="INSERT TOPIC..."
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontFamily: 'monospace', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>MESSAGE //</label>
                                <textarea
                                    rows="5"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    style={{
                                        width: '100%',
                                        background: '#111',
                                        border: '1px solid #333',
                                        color: 'white',
                                        padding: '0.8rem',
                                        fontFamily: 'monospace',
                                        outline: 'none',
                                        resize: 'vertical'
                                    }}
                                    placeholder="TRANSMIT DATA..."
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: 'var(--color-primary)', color: 'black' }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                style={{
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    background: 'transparent',
                                    border: '2px solid var(--color-primary)',
                                    color: 'var(--color-primary)',
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase'
                                }}
                            >
                                SEND TRANSMISSION
                            </motion.button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
