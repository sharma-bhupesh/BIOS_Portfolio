# Live Demonstration                            -              [BIOS Portfolio](https://biosportfolio.up.railway.app/)


---

# BIOS Portfolio

<div align="center">

### An Operating System Inspired Interactive Portfolio

*A portfolio that behaves like software rather than a traditional website.*

Built with **Django**, **Vanilla JavaScript (ES Modules)**, **HTML5**, and **CSS3**.

> **"Software should tell a story before it tells who built it."**

---

![Version](https://img.shields.io/badge/version-v1.0-success)
![Python](https://img.shields.io/badge/Python-3.13-blue)
![Django](https://img.shields.io/badge/Django-6.0-darkgreen)
![License](https://img.shields.io/badge/License-Apache%202.0-orange)

</div>

---

# Overview

BIOS Portfolio takes a different approach.

Instead of behaving like a webpage, it behaves like a lightweight operating system.

From the moment the application starts, the visitor experiences a complete boot sequence inspired by classic computer BIOS interfaces. Every interaction is keyboard-driven, windows open as independent modules, sounds accompany system events, and content is loaded dynamically instead of being hardcoded into the interface.

The objective was never to create another portfolio website.

The objective was to design software that **happens to present a portfolio**.

---

# Inspiration

The project draws inspiration from several systems and design philosophies:

- Classic PC BIOS interfaces
- DOS terminals
- Operating system boot sequences
- Retro CRT displays
- Modular software architecture
- Event-driven applications
- Mitch-Ivin WindowXP Portfolio

Rather than copying their appearance, the goal was to recreate the feeling of interacting with system software.

---

# Vision

BIOS Portfolio was built around one simple idea:

> **A portfolio should demonstrate engineering ability before listing engineering skills.**

Every animation, transition, sound, and interaction exists to support that idea.

Instead of describing problem-solving abilities, the project attempts to demonstrate them through software architecture, separation of responsibilities, modular rendering, and maintainable design.

---



# Preview

> Screenshots and demonstration GIFs will be added after deployment.

| Startup | Home |
|---------|------|
| *(Image)* | *(Image)* |

| Projects | Shutdown |
|-----------|----------|
| *(Image)* | *(Image)* |

---

# Core Features

## User Experience

- BIOS-inspired startup sequence
- Interactive shutdown sequence
- CRT display effects
- Keyboard-first navigation
- Window-based interface
- Dynamic overlays
- Nested project windows
- Authentic sound effects
- Full-screen immersive experience

---

## Architecture

- Modular application structure
- Independent managers
- Independent renderers
- Separation of rendering and logic
- Data-driven content loading
- Extensible project system
- Dynamic markdown rendering
- Minimal global state

---

## Backend

- Django powered backend
- Secure contact endpoint
- CSRF protection
- Environment variable configuration
- Structured logging
- Input validation
- Email integration
- Production-ready configuration

---

## Engineering Principles

- Single Responsibility Principle
- Separation of Concerns
- Event Driven Design
- Loose Coupling
- Maintainability
- Extensibility
- Data over Hardcoding

---

# Why This Project Exists

Many portfolios explain what their author knows.

BIOS Portfolio attempts to demonstrate **how the I think**.

Throughout the development of this project, emphasis was placed on designing systems that are:

- Easy to extend
- Easy to maintain
- Easy to understand
- Easy to evolve

rather than simply achieving the final visual result.

The architecture intentionally separates responsibilities between managers, renderers, utilities, and data sources to keep the application modular as it grows.

---

# Project Status

**Current Version**

```
BIOS Portfolio v1.0
```

---

# Application Lifecycle

Unlike a traditional portfolio website that immediately renders HTML to the screen, BIOS Portfolio behaves more like a software application.

From startup to shutdown, every major interaction passes through dedicated managers responsible for a single part of the application.

This approach keeps responsibilities isolated, improves maintainability, and makes future features significantly easier to integrate.

---

# High-Level Lifecycle

```
Browser
    │
    ▼
Application Startup
    │
    ▼
Boot Sequence
    │
    ▼
Interactive Environment
    │
    ▼
Window Navigation
    │
    ▼
Content Rendering
    │
    ▼
Shutdown Sequence
```

The application intentionally follows a controlled lifecycle instead of allowing every component to communicate directly with each other.

---

# Interaction

After initialization, the application behaves similarly to a lightweight operating system.

Every user action follows a predictable flow.

```
         Keyboard Input
                │
                ▼
           Navigation
                │
                ▼
           HomeManager
                │
        ┌───────┴──────┐
        ▼              ▼
OverlayManager   ContentManager
        │              │
        └───────┬──────┘
                ▼
             Renderer
```

This keeps every subsystem independent while still allowing them to cooperate through clearly defined responsibilities.

---

# Design Goal

The application lifecycle was intentionally designed to resemble software rather than webpages.

Every major state transition passes through dedicated managers responsible for one job only.

As a result:

- Components remain loosely coupled.
- Responsibilities remain predictable.
- New features can be added without rewriting existing systems.
- Individual modules remain independently testable.

---

# Software Architecture

The architecture of BIOS Portfolio is built around one core principle:

> **Every module should have one responsibility and communicate through well-defined interfaces.**

Instead of allowing every component to directly manipulate every other component, responsibilities are intentionally divided across managers, renderers, services, and utilities.

This minimizes coupling while maximizing maintainability and extensibility.

---

# Architectural Overview

```
                           BIOS Portfolio

                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
               Startup System              Runtime System
                    │                           │
                                                │
                                           HomeManager
                                                │
                 ┌──────────────────────────────┼──────────────────────────────┐
                 │                              │                              │
            Navigation                     OverlayManager                 ContentManager
                 │                              │                              │
                 └──────────────────────────────┼──────────────────────────────┘
                                                │
                                              Utility
```

Every module owns one responsibility.

No manager is responsible for rendering.

No renderer controls application flow.

No utility manages business logic.

---

# Architectural Principles

The architecture follows several design principles throughout the project.

### Single Responsibility

Every class is responsible for solving exactly one problem.

No class attempts to perform multiple unrelated responsibilities.

---

### Loose Coupling

Modules communicate through clearly defined interfaces rather than depending on each other's internal implementation.

This means individual modules can evolve independently without forcing changes across the rest of the application.

---

### Data-Driven Design

Most application content is loaded from structured files rather than being hardcoded.

Adding new content usually requires changing data rather than modifying application logic.

This keeps the codebase significantly easier to maintain as the project grows.

---

### Extensibility

The architecture was designed so new functionality can be introduced through extension instead of modification.

For example:

Adding a new project generally requires:

```
Create folder
        │
        ▼
Add markdown
        │
        ▼
Register metadata
        │
        ▼
Done
```

No renderer requires modification.

No navigation system requires rewriting.

No application flow changes.

---

### Change Isolation

One of the primary goals throughout development was ensuring that changes remain isolated to the subsystem they belong to.

Whenever possible:

- A renderer should be replaceable without changing application logic.
- A manager should evolve without affecting unrelated managers.
- New features should integrate through existing interfaces.
- Changes inside one subsystem should never cascade throughout the entire application.

This philosophy significantly reduces maintenance cost while making future development considerably safer.

---

# Component Responsibility Matrix

| Component | Primary Responsibility | Owns | Depends On | Must Never Do |
|-----------|------------------------|------|------------|---------------|
| **StartupManager** | Controls application startup lifecycle | Startup flow | None | Render UI directly |
| **HomeManager** | Coordinates runtime behaviour | Navigation State | OverlayManager, ContentManager | Render interface directly |
| **NavigationManager** | Handles keyboard navigation | Selection State | HomeManager | Load application content |
| **OverlayManager** | Controls overlay windows | Overlay Stack | Renderers | Handle navigation |
| **ContentManager** | Loads project content | Markdown/Data | Fetch API | Render UI |
| **ShutdownManager** | Coordinates shutdown lifecycle | Exit Flow | ShutdownRenderer | Startup logic |
| **ShutdownRenderer** | Renders shutdown visuals | Shutdown Screen | None | Control shutdown decisions |
| **MailService** | Sends contact requests | HTTP Communication | Django Backend | Render interface |
| **FaultManager** | Checks for  Errors & Faults | Keeps System Alive | Managers | Handle Fault |
| **Utilities** | Shared helper functions | Reusable Logic | None | Business logic |

---

# Why So Many Small Components?

- Smaller components are easier to understand.
- Individual modules can be tested independently.
- Features can evolve without rewriting unrelated systems.
- Bugs remain isolated to their respective modules.
- New functionality integrates through existing interfaces instead of introducing additional coupling.

The architecture intentionally favors **maintainability over short-term convenience**.

As the project grows, this design reduces complexity rather than increasing it.

The initial inspiration came from Mitch Ivin's Windows XP Portfolio project.

While exploring operating system-inspired interfaces, I wanted to create something that evoked the nostalgia of classic PC startup experiences rather than recreating a desktop environment.

That idea eventually evolved into BIOS Portfolio—a portfolio designed to feel like interacting with firmware rather than browsing a website.
