import React, { ChangeEvent, useEffect, useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { isNullOrEmpty } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export const ConfirmPassword = ({
  password,
  reset,
  onMatch = () => {},
  onNotMatch = () => {},
}: {
  password: string;
  reset: boolean;
  onChange?: () => any;
  onMatch?: () => any;
  onNotMatch?: () => any;
}) => {
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    setConfirmPassword("");
  }, [reset]);

  useEffect(() => {
    if (confirmPassword === password && !isNullOrEmpty(confirmPassword)) {
      onMatch();
    } else {
      onNotMatch();
    }
  }, [confirmPassword, password]);

  return (
    <div className="space-y-2">
      <Label htmlFor="password-confirm">Confirmation du mot de passe</Label>
      <PasswordInput
        id="password-confirm"
        className="pr-10"
        placeholder="Réécrivez votre mot de passe"
        value={confirmPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setConfirmPassword(e.target.value)
        }
        required
      />
      {confirmPassword !== password ? (
        !isNullOrEmpty(confirmPassword) && !isNullOrEmpty(password) ? (
          <div className="text-sm text-red-500 text-right">
            Les mots de passes ne correspondent pas.
          </div>
        ) : !isNullOrEmpty(confirmPassword) ? (
          <div className="text-sm text-yellow-500 text-right">
            Fournissez un mot de passe
          </div>
        ) : (
          <div className="text-sm text-yellow-500 text-right">
            Veuillez confirmer votre mot de passe.
          </div>
        )
      ) : (
        !isNullOrEmpty(confirmPassword) && (
          <div className="text-sm text-green-500 text-right">
            Le mot de passe correspond
          </div>
        )
      )}
    </div>
  );
};

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  toMaskIcon?: React.ReactNode;
  toShowIcon?: React.ReactNode;
  toMaskTitle?: string;
  toShowTitle?: string;
};

export const PasswordInput = ({
  toMaskIcon = <EyeOff />,
  toShowIcon = <Eye />,
  toMaskTitle = "Masquer le mot de passe",
  toShowTitle = "Dévoiler le mot de passe",
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="flex flex-row items-center relative">
        <Input
          type={showPassword ? "text" : "password"}
          className="pr-10 "
          {...props}
        />
        <div
          className="absolute right-2 scale-75"
          title={showPassword ? toMaskTitle : toShowTitle}
          onClick={() => setShowPassword((p) => !p)}
        >
          {showPassword ? toMaskIcon : toShowIcon}
        </div>
      </div>
    </>
  );
};
