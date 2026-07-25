import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Delete, Shield } from "lucide-react";
import GlobalBackground from "../components/GlobalBackground";
import {
  getAdminToken,
  loginAdmin,
  setAdminToken,
  verifyAdminSession,
} from "../services/adminAuth";
import "../styles/adminLogin.css";

const PIN_LENGTH = 6;

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const targetPath = location.state?.from?.pathname || "/admin";

  const slotCount = useMemo(() => PIN_LENGTH, []);

  useEffect(() => {
    inputRef.current?.focus();

    const restoreSession = async () => {
      if (!getAdminToken()) {
        return;
      }

      const authenticated = await verifyAdminSession();
      if (authenticated) {
        navigate(targetPath, { replace: true });
      }
    };

    restoreSession();
  }, [navigate, targetPath]);

  const handlePinChange = (value) => {
    setPin(value.replace(/\D/g, "").slice(0, PIN_LENGTH));
    setError("");
  };

  const handleKeypad = (value) => {
    setError("");

    if (value === "backspace") {
      setPin((current) => current.slice(0, -1));
      return;
    }

    setPin((current) => {
      if (current.length >= PIN_LENGTH) {
        return current;
      }

      return `${current}${value}`;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (pin.length !== PIN_LENGTH) {
      setError("Enter your 6-digit admin PIN");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await loginAdmin(pin);
      setAdminToken(result.data.token);
      navigate(targetPath, { replace: true });
    } catch (err) {
      setPin("");
      setError(err.message);
      inputRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin_login_page">
      <GlobalBackground />
      <div className="admin_login_shell">
        <form className="admin_login_card" onSubmit={handleSubmit}>
          <div className="admin_login_badge">
            <Shield size={18} />
            Admin Access
          </div>

          <h1 className="admin_login_title">Enter 6-Digit PIN</h1>
          <p className="admin_login_subtitle">
            Protected access for dashboard and editor routes with a fixed 6-digit code.
          </p>

          <div
            className="admin_login_pin-wrap"
            onClick={() => inputRef.current?.focus()}
          >
            <input
              ref={inputRef}
              className="admin_login_hidden-input"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={PIN_LENGTH}
              value={pin}
              onChange={(event) => handlePinChange(event.target.value)}
            />

            <div className="admin_login_pin-grid">
              {Array.from({ length: slotCount }).map((_, index) => (
                <div
                  key={index}
                  className={`admin_login_pin-slot ${index === pin.length ? "is-active" : ""} ${index < pin.length ? "is-filled" : ""}`}
                >
                  {index < pin.length ? <span /> : null}
                </div>
              ))}
            </div>
          </div>

          <p className="admin_login_error">{error}</p>

          <div className="admin_login_keypad">
            {[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "",
              "0",
              "backspace",
            ].map((key, index) =>
              key ? (
                <button
                  key={`${key}-${index}`}
                  type="button"
                  className={`admin_login_key flex justify-center items-center ${key === "backspace" ? "is-alt" : ""}`}
                  onClick={() => handleKeypad(key)}
                >
                  {key === "backspace" ? <Delete size={18} className="h-7 w-7" /> : key}
                </button>
              ) : (
                <div
                  key={`spacer-${index}`}
                  className="admin_login_key admin_login_key--spacer"
                />
              ),
            )}
          </div>

          <button className="admin_login_submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Authorizing..." : "Unlock Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
