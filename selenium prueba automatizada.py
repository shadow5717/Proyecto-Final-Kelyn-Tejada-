from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os
import shutil

# Limpiar y crear carpeta de capturas
if os.path.exists("screenshots"):
    shutil.rmtree("screenshots")
os.makedirs("screenshots")

def screenshot(nombre):
    time.sleep(1)
    driver.save_screenshot(f"screenshots/{nombre}.png")

driver = webdriver.Chrome()
driver.get("https://edesursmartgird.netlify.app/")
driver.maximize_window()
wait = WebDriverWait(driver, 10)

# Escenario 1: Página de inicio
time.sleep(3)
screenshot("01_inicio")

# Escenario 2: Reportar fallo
reportar = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "report-button")))
reportar.click()
time.sleep(1)
driver.switch_to.alert.send_keys("fallo")
driver.switch_to.alert.accept()
time.sleep(1)
driver.switch_to.alert.send_keys("Un autobús chocó un poste de luz y ahora no hay red eléctrica")
driver.switch_to.alert.accept()
time.sleep(1)
driver.switch_to.alert.accept()
screenshot("02_reportar_fallo")

# Escenario 3: Reportar mantenimiento
reportar = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "report-button")))
reportar.click()
time.sleep(1)
driver.switch_to.alert.send_keys("mantenimiento")
driver.switch_to.alert.accept()
time.sleep(1)
driver.switch_to.alert.send_keys("Mantenimiento por cambio de poste de luz")
driver.switch_to.alert.accept()
time.sleep(1)
driver.switch_to.alert.accept()
screenshot("03_reportar_mantenimiento")

# Escenario 4: Ver reportes históricos
driver.find_element(By.CSS_SELECTOR, "a[data-target='reportesHistoricos']").click()
screenshot("04_reportes_historicos")

# Escenario 5: Sección mantenimiento
driver.find_element(By.CSS_SELECTOR, "a[data-target='mantenimiento']").click()
screenshot("05_mantenimiento")

# Escenario 6: Sección alertas activas
driver.find_element(By.CSS_SELECTOR, "a[data-target='alertasActivas']").click()
screenshot("06_alertas_activas")

# Escenario 7: Sección análisis preventivo
driver.find_element(By.CSS_SELECTOR, "a[data-target='analisisPreventivo']").click()
screenshot("07_analisis_preventivo")

# Escenario 8: Estado general
driver.find_element(By.CSS_SELECTOR, "a[data-target='estadoGeneral']").click()
screenshot("08_estado_general")

print(" Flujo completado con éxito. Capturas listas para el reporte.")

driver.quit()
