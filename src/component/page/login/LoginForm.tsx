import { FC, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Form, Field } from "react-final-form";
import { ValidationErrors } from "final-form";
import {
  FieldRenderParams,
  FormRenderParams,
  StyledParams,
} from "@/type/common";
import { LoginParams } from "@/type/login";
import {
  Box,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { InputText } from "@/component/element/InputText";
import { LoadingButton } from "@mui/lab";

type LoginFormProps = {
  onLogin: (params: LoginParams) => void;
  loading: boolean;
};

/**
 * @returns Component LoginForm Module
 */
export const LoginForm: FC<LoginFormProps> = ({ onLogin, loading }) => {
  /**
   * Validate password
   * @returns Partial<ValidationErrors>
   */
  const validate = useCallback((values: LoginParams) => {
    const { username, password } = values;
    const errors: Partial<ValidationErrors> = {};
    if (!username) {
      errors.username = "Vui lòng nhập tên người dùng";
    }
    if (username && username.length < 5) {
      errors.username = "Tên người dùng phải lớn hơn 4 kí tự.";
    }
    if (!password) {
      errors.password = "Vui lòng nhập mật khẩu";
    }
    if (password && password.length < 5) {
      errors.password = "Mật khẩu phải lớn hơn 4 kí tự.";
    }
    return errors;
  }, []);

  return (
    <Form
      keepDirtyOnReinitialize
      render={({ values }: FormRenderParams<LoginParams>) => {
        return (
          <Wrapper>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Stack gap={2} pt={2}>
                  <Box>
                    <Field<string> name="username">
                      {({ input, meta }: FieldRenderParams<string>) => (
                        <InputText
                          title="User Name"
                          inputError={meta.touched && meta.error}
                          inputProps={input}
                        />
                      )}
                    </Field>
                  </Box>
                  <Box>
                    <Field<string> name="password">
                      {({ input, meta }: FieldRenderParams<string>) => (
                        <InputText
                          title="Password"
                          inputError={meta.touched && meta.error}
                          inputProps={{ ...input, type: "password" }}
                        />
                      )}
                    </Field>
                  </Box>
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => onLogin(values)}
                  >
                    Sign In
                  </LoadingButton>
                </Stack>
              </Box>
            </Container>
          </Wrapper>
        );
      }}
      validate={validate}
      onSubmit={onLogin}
    />
  );
};

const Wrapper = styled(Stack)(({}: StyledParams) => ({
  alignItems: "center",
  justifyContent: "center",
}));
