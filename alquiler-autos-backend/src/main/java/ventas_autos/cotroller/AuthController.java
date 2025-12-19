package ventas_autos.cotroller;

import ventas_autos.dto.LoginRequest;
import ventas_autos.dto.LoginResponse;
import ventas_autos.model.LoginUser;
import ventas_autos.repository.LoginUserRepository;
import ventas_autos.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final LoginUserRepository loginUserRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(LoginUserRepository loginUserRepository, JwtUtil jwtUtil) {
        this.loginUserRepository = loginUserRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<LoginUser> userOpt = loginUserRepository.findByUsername(request.getUsername());

        if (userOpt.isPresent() && passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            String token = jwtUtil.generateToken(userOpt.get().getUsername());
            return ResponseEntity.ok(new LoginResponse(token));
        } else {
            return ResponseEntity.status(401).body("Usuario o contraseña inválidos");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest request) {
        // Verificar si el usuario ya existe
        if (loginUserRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("El usuario ya existe");
        }

        // Crear nuevo usuario con rol proporcionado desde el frontend
        LoginUser nuevo = new LoginUser(
                request.getUsername(),
                passwordEncoder.encode(request.getPassword()),
                request.getRol()   // 👈 Ahora toma el rol enviado en el JSON
        );

        loginUserRepository.save(nuevo);
        return ResponseEntity.ok("Usuario registrado correctamente");
    }
}
