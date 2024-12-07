--
# Brenkalo

Brenkalo je spletna trgovina za kitare, ki omogoča uporabnikom pregledovanje in nakup različnih vrst kitar. Projekt je razvit kot del fakultetne naloge.

# Funkcionalnosti

## Iskanje kitar
Uporabniki lahko iščejo kitare po različnih kriterijih, kot so znamka, tip, cena in drugi parametri.

## Filtriranje po kategorijah
Kitare so razvrščene v različne kategorije, kot so akustične, električne, bas kitare itd., kar omogoča enostavno navigacijo in iskanje.

## Pregled košarice
Uporabniki lahko pregledajo izdelke, ki so jih dodali v košarico, in upravljajo količine ali odstranijo izdelke pred zaključkom nakupa.

## Nakup kitar
Uporabniki lahko zaključijo nakup s preprostim postopkom, ki vključuje vnos podatkov za dostavo in plačilo.

## Ocene in mnenja
Uporabniki lahko preberejo ocene in mnenja drugih kupcev ter dodajo svoje ocene za kupljene izdelke.

## Uporabniški računi
Uporabniki lahko ustvarijo račune, se prijavijo in upravljajo svoje profile, vključno z zgodovino nakupov in shranjenimi naslovi za dostavo.

## Kontaktni obrazec
Uporabniki lahko preko kontaktnega obrazca pošljejo vprašanja ali povratne informacije ekipi spletne trgovine.

## Podpora za več jezikov
Spletna trgovina podpira več jezikov, kar omogoča uporabnikom iz različnih regij enostavno uporabo.

## Prilagodljive možnosti plačila
Uporabniki lahko izbirajo med različnimi načini plačila, kot so kreditne kartice, PayPal in drugi.

## Obvestila o zalogi
Uporabniki lahko nastavijo obvestila za izdelke, ki trenutno niso na zalogi, in prejmejo obvestilo, ko so ti izdelki ponovno na voljo.

## Tehnologije

- **Frontend:** React
- **Backend:** .NET
- **DB:** SQLite
- **Testni strežnik Frontend:** test
- **Testni strežnik Backend:** http://localhost:5020/ 

## Namestitev

1. **Klonirajte repozitorij:**
   ```bash
    git clone https://github.com/janrepar/BrenkaloWebStore.git
    git clone https://github.com/janrepar/BrenkaloWebStoreApi.git
   ```
2. **Namestite odvisnosti za frontend:**
   ```bash
   cd frontend
   npm install
   ```

3. **Zaženite frontend:**
    ```bash
    cd BrenkaloWebStore
    npm install
    ```

4. **Namestite odvisnosti za backend:**
   ```bash
    cd ../BrenkaloWebStoreApi
    dotnet restore
   ```
5. **Zaženite backend:**
   ```bash  
    dotnet run
   ```

## Uporaba

1. Odprite brskalnik in pojdite na `http://localhost:5020/` za dostop do spletne trgovine.
2. Prebrskajte in izberite kitare, ki vas zanimajo.
3. Dodajte izbrane kitare v košarico in nadaljujte z nakupom.

## Podpora

Če naletite na težave ali imate vprašanja, nas kontaktirajte na info@brenkalo.com.

## Razvojno drevo

```plaintext
brenkalo/
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   └── Program.cs
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
└── README.md
```

## Prispevanje

Če želite prispevati k projektu, sledite tem korakom:

1. Forkajte repozitorij.
2. Ustvarite novo vejo (`git checkout -b feature/ime-veje`).
3. Naredite spremembe in jih commitajte (`git commit -m 'Dodajte opis spremembe'`).
4. Potisnite vejo (`git push origin feature/ime-veje`).
5. Odprite Pull Request.

## Avtorji

- **Gregor Grajzar** - GitHub profil
- **Jan Repar** - GitHub profil
- **Tea Zakšek** - Github profil

## Licenca

Ta projekt je licenciran pod MIT licenco - glejte LICENSE datoteko za podrobnosti.

---