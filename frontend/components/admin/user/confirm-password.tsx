import { useEffect, useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

export function ConfirmPassword({
  password,
  reset,
  onMatch = () => {},
  onNotMatch = () => {},
}: {
  password: string;
  reset: boolean;
  onMatch?: () => any;
  onNotMatch?: () => any;
}) {
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    setConfirmPassword("");
  }, [reset]);

  useEffect(() => {
    if (confirmPassword === password) {
      onMatch();
    } else {
      onNotMatch();
    }
  }, [confirmPassword, password]);

  return (
    <div className="space-y-2">
      <Label htmlFor="password-confirm">Confirmation du mot de passe</Label>
      <Input
        id="password-confirm"
        type="password"
        placeholder="Réécrivez votre mot de passe"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      {confirmPassword !== password ? (
        confirmPassword != "" && password != "" ? (
          <div className="text-sm text-red-500 text-right">
            Les mots de passes ne correspondent pas.
          </div>
        ) : confirmPassword != "" ? (
          <div className="text-sm text-yellow-500 text-right">
            Fournissez un mot de passe
          </div>
        ) : (
          <div className="text-sm text-yellow-500 text-right">
            Veuillez confirmer votre mot de passe.
          </div>
        )
      ) : (
        confirmPassword != "" && (
          <div className="text-sm text-green-500 text-right">
            Le mot de passe correspond
          </div>
        )
      )}
    </div>
  );
}
