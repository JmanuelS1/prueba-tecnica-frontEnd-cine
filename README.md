# prueba-tecnica-frontEnd-cine
Frontend Challenge - Movie Platform
Este proyecto es una aplicación web de películas desarrollada como parte de un desafío técnico frontend. La aplicación permite a los usuarios explorar películas, ver detalles y gestionar sus favoritos.
🚀 Características
🎬 Exploración de películas
🔍 Búsqueda de películas
❤️ Sistema de favoritos
🔐 Autenticación de usuarios
📱 Diseño responsivo
🎨 Interfaz moderna y atractiva
🛠️ Tecnologías Utilizadas
Next.js 13
TypeScript
Tailwind CSS
Zustand (Estado global)
React Query
React Icons
📋 Prerrequisitos
Node.js (versión 16 o superior)
npm o yarn
🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/frontend-challenge.git
```

2. Navega al directorio del proyecto:
```bash
cd frontend-challenge
```

3. Instala las dependencias:
```bash
npm install
# o
yarn install
```

4. Crea un archivo `.env.local` en la raíz del proyecto y añade las variables de entorno necesarias:
```bash
NEXT_PUBLIC_API_URL=tu_url_api
```

5. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🔑 Credenciales de Prueba
Email: test@gmail.com
Password: pass


## 📁 Estructura del Proyecto

```
src/
  ├── app/              # Rutas y páginas de Next.js
  ├── components/       # Componentes reutilizables
  ├── hooks/           # Custom hooks
  ├── lib/             # Utilidades y configuraciones
  ├── services/        # Servicios de API
  └── types/           # Definiciones de tipos TypeScript
```


## 🧪 Testing
npm run test
# o
yarn test


## 📚 Documentación de Componentes
AuthModal
Modal de autenticación que maneja tanto el login como el registro (UI only).
MovieCard
Componente para mostrar la información básica de una película.
Navbar
Barra de navegación principal con búsqueda y acciones de usuario.
FavoriteButton
Botón para gestionar películas favoritas.


## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.


## 📝 Notas

- La funcionalidad de registro está implementada solo a nivel de UI
- Los favoritos se almacenan localmente
- La API tiene un límite de rate


## 👨‍💻 Autor
Jesús Manuel Sánchez Rincón


## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles
