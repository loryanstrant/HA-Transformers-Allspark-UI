## Card Types

All cards support the 'font_style' setting, with the following options:
- 'theme' = defaults to the font specified in the theme of the view selected
- 'g1' = Original G1 cartoon style font
- 'movie' = Bayverse movie style font

#### Example using G1 style
<img width="1008" height="383" alt="image" src="https://github.com/user-attachments/assets/5b95157f-2461-493d-8844-8cedebdd83a6" />

#### Example using movie style
<img width="1008" height="373" alt="image" src="https://github.com/user-attachments/assets/6eb6c5d0-8640-472d-aa66-e9a1ea48f5b6" />


The difference is more noticeable on cards with more text, or that use lowercase letters (G1 can do lowercase, movie cannot).



### 1. Status Card

Displays multiple entity states in a structured list format with status indicators.

<img width="541" height="344" alt="image" src="https://github.com/user-attachments/assets/36bba4fe-ee56-4384-b4ff-e9bb855f7e3c" />


#### Configuration

```yaml
type: custom:transformers-status-card
title: SYSTEM STATUS
entities:
  - entity: binary_sensor.front_door
    name: MAIN ENTRANCE
  - entity: sensor.temperature_living_room
    name: AMBIENT TEMP
  - entity: sensor.humidity_living_room
    name: HUMIDITY LEVEL
  - entity: binary_sensor.motion_hallway
    name: MOTION DETECT
message: ALL SYSTEMS OPERATIONAL
show_message: true
theme: autobot
```

#### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `SYSTEM STATUS` | Card header text |
| `entities` | list | **required** | List of entities to display |
| `message` | string | `ALL SYSTEMS OPERATIONAL` | System status message |
| `show_message` | boolean | `true` | Show/hide the status message |
| `theme` | string | `autobot` | Color theme: `autobot`, `decepticon`, `red`, `yellow` |

### 2. Sensor Card

Displays a single sensor value with optional progress bar visualization.

<img width="541" height="219" alt="image" src="https://github.com/user-attachments/assets/12876e94-5512-4214-93f5-f4ddc989065a" />


#### Configuration

```yaml
type: custom:transformers-sensor-card
entity: sensor.cpu_temperature
name: CORE TEMPERATURE
unit: "°C"
show_graph: true
max: 100
```

#### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entity` | string | **required** | Entity ID to display |
| `name` | string | entity name | Custom display name |
| `unit` | string | entity unit | Custom unit of measurement |
| `show_graph` | boolean | `true` | Show/hide progress bar |
| `max` | number | `100` | Maximum value for progress bar |

### 3. Button Card

Interactive buttons for controlling entities or triggering services.

<img width="541" height="125" alt="image" src="https://github.com/user-attachments/assets/847a4ac5-918a-4d58-8358-d1290054dea4" />


#### Configuration

```yaml
type: custom:transformers-button-card
title: CONTROL PANEL
columns: 2
buttons:
  - entity: light.living_room
    name: ILLUMINATION
    icon: 💡
    action: toggle
    show_state: true
  - entity: switch.coffee_maker
    name: BEVERAGE SYS
    action: toggle
  - service: script.security_protocol
    name: SECURITY
    icon: 🔒
```

#### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `CONTROL PANEL` | Card header text |
| `columns` | number | `1` | Number of columns (1-3) |
| `buttons` | list | **required** | List of button configurations |

Button configuration:
- `entity`: Entity to control
- `name`: Button label
- `icon`: Optional icon/emoji
- `action`: Action to perform (toggle, turn_on, turn_off)
- `show_state`: Display entity state
- `service`: Alternative service call (instead of entity)
- `service_data`: Data for service call
- `tap_action`: Advanced action configuration

### 4. Text Card

Displays text messages in Transformers terminal format with support for dynamic content.

<img width="541" height="213" alt="image" src="https://github.com/user-attachments/assets/b73bad09-d6d1-4d7a-aca6-5a6d5954157d" />


#### Configuration

```yaml
type: custom:transformers-text-card
title: SYSTEM NOTICE
content: |
  ATTENTION: ALL AUTOBOTS
  
  MISSION BRIEFING AT 0800 HOURS
  REPORT TO COMMAND CENTER
  
  - OPTIMUS PRIME
size: medium
align: left
show_prompt: true
```

#### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `MESSAGE` | Card header text |
| `content` | string | **required** | Text content to display |
| `entity` | string | optional | Entity to monitor for dynamic content |
| `state_content` | object | optional | State-specific content mapping |
| `size` | string | `medium` | Text size (small, medium, large) |
| `align` | string | `left` | Text alignment (left, center, right) |
| `show_prompt` | boolean | `true` | Show terminal prompt (>) |
| `typing_effect` | boolean | `false` | Animated typing effect |

**Dynamic Content Example:**

```yaml
type: custom:transformers-text-card
title: SECURITY STATUS
entity: alarm_control_panel.home
state_content:
  disarmed: |
    SYSTEM DISARMED
    ALL ZONES INACTIVE
  armed_away: |
    ALERT: SYSTEM ARMED
    PERIMETER SECURED
  triggered: |
    ⚠ ALARM TRIGGERED ⚠
    SECURITY BREACH DETECTED
  default: SYSTEM STATUS UNKNOWN
```

**Template Variables:**
- `{{state}}` - Entity state value
- `{{friendly_name}}` - Entity friendly name
- `{{unit}}` - Unit of measurement
- `{{attribute.name}}` - Any entity attribute

### 5. Gauge Card

Displays a circular gauge visualization for numeric sensors with customizable thresholds.

<img width="541" height="353" alt="image" src="https://github.com/user-attachments/assets/01250c12-2ce3-4ea9-8ba5-58634b0e92e5" />


#### Configuration

```yaml
type: custom:transformers-gauge-card
entity: sensor.cpu_usage
name: CPU LOAD
min: 0
max: 100
decimals: 1
severity:
  yellow: 70
  red: 90
```

#### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entity` | string | **required** | Entity ID to display |
| `name` | string | entity name | Custom display name |
| `unit` | string | entity unit | Custom unit of measurement |
| `min` | number | `0` | Minimum gauge value |
| `max` | number | `100` | Maximum gauge value |
| `decimals` | number | `1` | Number of decimal places |
| `severity` | object | `{}` | Severity thresholds (yellow, red) |

### 6. Clock Card

Displays current time and date in Transformers format with live updates.

<img width="541" height="218" alt="image" src="https://github.com/user-attachments/assets/7c1a6961-9754-481a-a83b-ac64bc065936" />


#### Configuration

```yaml
type: custom:transformers-clock-card
title: SYSTEM TIME
format_24h: true
show_seconds: true
show_date: true
show_timezone: false
```

#### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `SYSTEM TIME` | Card header text |
| `format_24h` | boolean | `true` | Use 24-hour time format |
| `show_seconds` | boolean | `true` | Display seconds |
| `show_date` | boolean | `true` | Display date |
| `show_timezone` | boolean | `false` | Display timezone |

### 7. Glance Card

Compact multi-entity overview card displaying multiple entities in a grid.

<img width="1151" height="166" alt="image" src="https://github.com/user-attachments/assets/9bfec7e7-733f-4201-99a2-ad31aaa21308" />


#### Configuration

```yaml
type: custom:transformers-glance-card
title: SYSTEM OVERVIEW
entities:
  - entity: sensor.temperature
    name: TEMP
  - entity: sensor.humidity
    name: HUMIDITY
  - binary_sensor.motion
  - light.living_room
columns: 2
show_name: true
```

#### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `SYSTEM GLANCE` | Card header text |
| `entities` | list | **required** | List of entities to display |
| `columns` | number | auto | Number of columns (2-5) |
| `show_name` | boolean | `true` | Show entity names |

### 8. Light Card

Dedicated light entity control with brightness slider and on/off toggle.

<img width="541" height="329" alt="image" src="https://github.com/user-attachments/assets/2efdb28d-9c01-486f-a56a-b4aca269a5c6" />


#### Configuration

```yaml
type: custom:transformers-light-card
entity: light.living_room
name: MAIN ILLUMINATION
```

#### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entity` | string | **required** | Light entity ID |
| `name` | string | entity name | Custom display name |

### 9. Picture Card

Display images or camera feeds with Transformers-style filtering effects.

<img width="541" height="140" alt="image" src="https://github.com/user-attachments/assets/534c0b69-4cc2-49d4-992d-3f6fec68d59b" />


#### Configuration

```yaml
type: custom:transformers-picture-card
title: VISUAL FEED
entity: camera.front_door
# OR use a static image
# image: /local/my-image.jpg
caption: SURVEILLANCE CAMERA 01
show_timestamp: true
camera_refresh_interval: 5
```

#### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `VISUAL FEED` | Card header text |
| `entity` | string | optional | Camera entity ID |
| `image` | string | optional | Static image URL |
| `caption` | string | optional | Image caption |
| `show_timestamp` | boolean | `false` | Show capture timestamp |
| `camera_refresh_interval` | number | `0` | Auto-refresh interval in seconds (0 = disabled) |

### 10. Weather Card

Display weather information with current conditions and forecast.

<img width="541" height="446" alt="image" src="https://github.com/user-attachments/assets/9f6ad290-225c-4102-b5cb-33ab50d247c5" />


#### Configuration

```yaml
type: custom:transformers-weather-card
entity: weather.home
name: ATMOSPHERIC CONDITIONS
show_forecast: true
forecast_days: 5
```

#### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `entity` | string | **required** | Weather entity ID |
| `name` | string | entity name | Custom display name |
| `show_forecast` | boolean | `true` | Show weather forecast |
| `forecast_days` | number | `5` | Number of forecast days |

### 11. Alarm Card

Control alarm systems with a Transformers-style keypad interface.

<img width="541" height="591" alt="image" src="https://github.com/user-attachments/assets/1522f401-43a5-4ca5-b10f-e0189de07738" />


#### Configuration

```yaml
type: custom:transformers-alarm-card
title: SECURITY SYSTEM
entity: alarm_control_panel.home
show_keypad: true
```

#### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `SECURITY SYSTEM` | Card header text |
| `entity` | string | **required** | alarm_control_panel entity ID |
| `show_keypad` | boolean | `true` | Show numeric keypad |

## Styling

All cards use CSS custom properties for easy theming:

```css
--transformers-primary-color: #e31e24;        /* Autobot red */
--transformers-secondary-color: #1e3a8a;      /* Autobot blue */
--transformers-accent-color: #fbbf24;         /* Yellow accent */
--transformers-background-color: #0a0e27;     /* Dark background */
--transformers-panel-color: #1a1f3a;          /* Panel color */
--transformers-border-color: #e31e24;         /* Border color */
--transformers-text-color: #ffffff;           /* Text color */
--transformers-glow-color: rgba(227, 30, 36, 0.6);  /* Glow effect */
--transformers-font-family: 'Transformers Movie', 'Arial Black', sans-serif;
--transformers-header-font: 'Transformers Movie', 'Arial Black', sans-serif;
--transformers-grid-opacity: 0.15;            /* Grid pattern opacity */
```
