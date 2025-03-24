import bcrypt
from app.repositories.user_repository import UserRepository
from app.models.user_model import UserCreate, UserLogin, UserResponse


class UserService:
    def __init__(self):
        self.user_repo = UserRepository()

    def get_user_by_email(self, correo: str):
        return self.user_repo.get_user_by_email(correo)

    def create_user(self, user: UserCreate):
        hashed_password = bcrypt.hashpw(
            user.contraseña.encode('utf-8'), bcrypt.gensalt()
        ).decode('utf-8')
        new_user = self.user_repo.create_user(user, hashed_password)
        return UserResponse(**new_user)

    def authenticate_user(self, user: UserLogin):
        userDB = self.user_repo.get_user_by_email(user.correo)
        if not userDB or not bcrypt.checkpw(
            user.contraseña.encode("utf-8"),
            userDB["contraseña"].encode("utf-8")
        ):
            return None
        return UserResponse(**userDB)
