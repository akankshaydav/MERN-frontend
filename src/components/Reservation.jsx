import React, { useState, useEffect } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Backend URL (Vite env)
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Reservation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Optional: backend reachability check
  useEffect(() => {
    console.log("🔗 Backend URL:", BACKEND_URL);
  }, []);

  const handleReservation = async (e) => {
    e.preventDefault();

    // Required fields check
    if (!firstName || !lastName || !email || !phone || !date || !time) {
      toast.error("Please fill all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Phone validation (11 digits) - UPDATED
    if (!/^\d{11}$/.test(phone)) {
      toast.error("Phone number must contain 11 digits");
      return;
    }

    setIsSubmitting(true);

    try {
      const reservationData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        date,
        time,
      };

      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/reservation/send`,
        reservationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          timeout: 10000,
        }
      );

      toast.success(data.message || "Reservation successful!");

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");

      setTimeout(() => {
        navigate("/success");
      }, 1000);
    } catch (error) {
      console.error("Reservation Error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to send reservation. Try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reserve.png" alt="reservation" />
        </div>

        <div className="banner">
          <div className="reservation_form_box">
            <h1>MAKE A RESERVATION</h1>
            <p>For Further Questions, Please Call</p>

            <form onSubmit={handleReservation}>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isSubmitting}
                  required
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={isSubmitting}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />

                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="email_tag"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone (11 digits)"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))
                  }
                  maxLength={11}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  opacity: isSubmitting ? 0.6 : 1,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting ? "SUBMITTING..." : "RESERVE NOW"}
                {!isSubmitting && (
                  <span>
                    <HiOutlineArrowNarrowRight />
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;