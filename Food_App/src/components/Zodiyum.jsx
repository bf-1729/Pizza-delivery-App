import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import "./Zodiyum.css";

function Zodiyum() {
  const [zodiac, setZodiac] = useState("");
  const [reply, setReply] = useState("");
  const [loadings, setLoadings] = useState(false);
  const [show, setShow] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const handleClose = () => {
    setShow(false);
    setZodiac("");
    setReply("");
  };
  
  const handleShow = () => setShow(true);

  const zodiacEmojis = {
    aries: "♈",
    taurus: "♉",
    gemini: "♊",
    cancer: "♋",
    leo: "♌",
    virgo: "♍",
    libra: "♎",
    scorpio: "♏",
    sagittarius: "♐",
    capricorn: "♑",
    aquarius: "♒",
    pisces: "♓"
  };

  const validZodiacs = Object.keys(zodiacEmojis);

  const getPizza = async () => {
    const zodiacTrimmed = zodiac.trim().toLowerCase();

    if (!zodiacTrimmed) {
      alert("Please enter a zodiac sign");
      return;
    }

    if (!validZodiacs.includes(zodiacTrimmed)) {
      alert("Please enter a valid zodiac sign");
      return;
    }

    setLoadings(true);
    setReply("");

    try {
      const response = await axios.post(backendUrl+"/api/pizzas/chat", {
        horoscope: zodiacTrimmed
      });

      if (response.data && response.data.reply) {
        setReply(response.data.reply);
      } else {
        setReply("Couldn't find a suggestion for this sign. Try another one!");
      }
    } catch (err) {
      setReply("Sorry, there was an error fetching the pizza suggestion.");
    } finally {
      setLoadings(false);
    }
  };
  return (
    <div className="App">
      <div className="button">
      <button className="zodiyum-button" onClick={handleShow}>
        ✨
      </button>
      </div>

      <Modal show={show} onHide={handleClose} className="container" centered>
        <Modal.Body className="Modalbody">
        <p className="welcome">Welcome to ZodiYum - a playful AI that pairs your zodiac sign with the perfect pizza! 🌌🍕</p>
          <h1 className="zodiyum_header">ZodiYum 🍕</h1>

          <div>
          <div className="zodiac_container">
            <input
              value={zodiac}
              className="zodiac_input"
              onChange={(e) => setZodiac(e.target.value)}
              placeholder="Enter your zodiac sign"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getPizza();
                }
              }}
            />

            <button className="zodiac_button" onClick={getPizza} disabled={loadings}>
              {loadings ? "Loading..." : "Get Pizza Match"}
            </button>
            </div>

            {reply && (
              <div className="reply">
                <strong>Your Cosmic Pizza:</strong>
                <p className="zodiac_pizza">
                  {zodiacEmojis[zodiac.trim().toLowerCase()] || "🌟"} {reply}
                </p>
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer className="footer">
          <button className="btn" onClick={handleClose} aria-label="Close pizza detail modal">
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Zodiyum;
