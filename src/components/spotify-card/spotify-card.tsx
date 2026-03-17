import { AnimatePresence, motion } from "motion/react";
import Card from "../card/card";
import './spotify-card.scss';
import { FaRecordVinyl } from "react-icons/fa";

function SpotifyCard() {
    let isPlaying = false;
    return (
        <Card className='spotify-card'>
            <Card.Title>
                Now playing
            </Card.Title>
            <div className="spotify-header-container">
                <div>
                    <img src="spotify.svg" className="logo" />
                    <span className="spotify-text">Spotify</span>
                </div>
                <AnimatePresence>
                    {isPlaying && (
                        <motion.div
                            key="playing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="playing"
                            style={{ height: "14px" }}
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    style={{
                                        width: "3px",
                                        backgroundColor: "#1db954",
                                        borderRadius: "2px",
                                    }}
                                    animate={{ height: ["4px", "10px", "6px", "12px", "4px"] }}
                                    transition={{
                                        duration: 0.9,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="spotify-content-container">
                <div className="track-content">
                    {
                        !isPlaying && <>
                            <div className="record-background">
                                <FaRecordVinyl className="logo" />
                            </div>
                            <span className="text secondary">No jam ongoing</span>
                        </>
                    }
                    {
                        isPlaying && <>
                            <div className="record-background">
                                <FaRecordVinyl className="logo" />
                            </div>
                            <span className="text secondary">No jam ongoing</span>
                        </>
                    }
                </div>
                <div className="playback" />
            </div>
        </Card>
    );
}

export default SpotifyCard;