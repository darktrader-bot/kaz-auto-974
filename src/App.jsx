import { useState } from 'react'
import { HashRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import './App.css'
import logoImg from './logo.png'

const garages = [
  {
    id: '1',
    name: 'Garage du Piton',
    address: '15 Rue de Paris, 97400 Saint-Denis',
    phone: '0262 12 34 56',
    rating: 4.8,
    reviews: 127,
    specialties: ['Mécanique générale', 'Climatisation', 'Électricité'],
    assurances: ['MAAF', 'AXA', 'MMA', 'Groupama'],
    horaires: {
      lundi: '08:00 - 18:00', mardi: '08:00 - 18:00', mercredi: '08:00 - 18:00',
      jeudi: '08:00 - 18:00', vendredi: '08:00 - 18:00', samedi: '08:00 - 12:00', dimanche: 'Fermé'
    },
    prixIndicatifs: { vidange: '80€ - 120€', plaquettes: '150€ - 250€', climatisation: '90€ - 150€' }
  },
  {
    id: '2',
    name: 'Auto Service Sud',
    address: 'Zone Industrielle, 97410 Saint-Pierre',
    phone: '0262 23 45 67',
    rating: 4.5,
    reviews: 89,
    specialties: ['Carrosserie', 'Mécanique', 'Pneus'],
    assurances: ['MACIF', 'Allianz', 'MAIF'],
    horaires: {
      lundi: '07:30 - 17:30', mardi: '07:30 - 17:30', mercredi: '07:30 - 17:30',
      jeudi: '07:30 - 17:30', vendredi: '07:30 - 17:30', samedi: 'Fermé', dimanche: 'Fermé'
    },
    prixIndicatifs: { vidange: '75€ - 110€', plaquettes: '140€ - 230€', carrosserie: 'Sur devis' }
  },
  {
    id: '3',
    name: 'Garage Ouest Auto',
    address: 'Rue du Commerce, 97460 Saint-Paul',
    phone: '0262 34 56 78',
    rating: 4.9,
    reviews: 203,
    specialties: ['Moteur', 'Transmission', 'Diagnostic électronique'],
    assurances: ['MAAF', 'AXA', 'MMA', 'Groupama', 'MACIF'],
    horaires: {
      lundi: '08:00 - 18:00', mardi: '08:00 - 18:00', mercredi: '08:00 - 18:00',
      jeudi: '08:00 - 18:00', vendredi: '08:00 - 18:00', samedi: '08:00 - 12:00', dimanche: 'Fermé'
    },
    prixIndicatifs: { vidange: '85€ - 125€', diagnostic: '60€', embrayage: '450€ - 750€' }
  },
  {
    id: '4',
    name: 'Garage des Hauts',
    address: 'Route Nationale 3, 97430 Le Tampon',
    phone: '0262 45 67 89',
    rating: 4.6,
    reviews: 156,
    specialties: ['4x4', 'Utilitaires', 'Mécanique générale'],
    assurances: ['MMA', 'Groupama', 'Allianz'],
    horaires: {
      lundi: '07:00 - 17:00', mardi: '07:00 - 17:00', mercredi: '07:00 - 17:00',
      jeudi: '07:00 - 17:00', vendredi: '07:00 - 17:00', samedi: '07:00 - 12:00', dimanche: 'Fermé'
    },
    prixIndicatifs: { vidange: '70€ - 100€', pneus: 'Sur devis', revision: '120€ - 180€' }
  },
  {
    id: '5',
    name: 'Garage de l\'Est',
    address: 'Route de Sainte-Anne, 97440 Saint-André',
    phone: '0262 56 78 90',
    rating: 4.7,
    reviews: 98,
    specialties: ['Mécanique générale', 'Pneus', 'Vidange'],
    assurances: ['MAAF', 'AXA', 'MACIF'],
    horaires: {
      lundi: '08:00 - 17:00', mardi: '08:00 - 17:00', mercredi: '08:00 - 17:00',
      jeudi: '08:00 - 17:00', vendredi: '08:00 - 17:00', samedi: '08:00 - 12:00', dimanche: 'Fermé'
    },
    prixIndicatifs: { vidange: '75€ - 115€', pneus: 'Sur devis', mecanique: '60€/h' }
  },
]

const diagnosticCategories = [
  {
    id: 'moteur', name: 'Moteur', icon: '⚙️', description: 'Démarrage difficile, bruits anormaux',
    problems: [
      { id: 'm1', title: 'Démarrage difficile', symptoms: ['Le moteur tourne mais ne démarre pas', 'Démarrage lent'], causes: ['Batterie faible', 'Démarreur usé', "Problème d'allumage"], solutions: ['Vérifier la batterie', 'Tester le démarreur', 'Contrôler les bougies'], urgency: 'medium', estimatedCost: '50€ - 300€' },
      { id: 'm2', title: 'Bruit anormal du moteur', symptoms: ['Cliquettis', 'Sifflement', 'Frottement'], causes: ['Courroie usée', 'Problème de distribution', "Manque d'huile"], solutions: ["Vérifier le niveau d'huile", 'Contrôler les courroies', 'Consulter un spécialiste'], urgency: 'high', estimatedCost: '100€ - 800€' }
    ]
  },
  {
    id: 'batterie', name: 'Batterie', icon: '🔋', description: 'Perte de puissance, démarrage impossible',
    problems: [
      { id: 'b1', title: 'Batterie à plat', symptoms: ['Voyants faibles', 'Démarrage impossible', 'Clic au contact'], causes: ['Batterie usée', 'Alternateur défectueux', 'Oubli de phares'], solutions: ['Recharger la batterie', 'Remplacer la batterie', "Vérifier l'alternateur"], urgency: 'high', estimatedCost: '80€ - 200€' }
    ]
  },
  {
    id: 'freins', name: 'Freins', icon: '🛑', description: 'Perte de puissance de freinage',
    problems: [
      { id: 'f1', title: 'Freins qui sifflent', symptoms: ['Bruit aigu au freinage', 'Vibration'], causes: ['Plaquettes usées', 'Disques voilés', 'Étrier grippé'], solutions: ['Changer les plaquettes', 'Rectifier les disques', "Nettoyer l'étrier"], urgency: 'high', estimatedCost: '150€ - 400€' }
    ]
  },
  {
    id: 'climatisation', name: 'Climatisation', icon: '❄️', description: 'Air non froid, odeurs',
    problems: [
      { id: 'c1', title: 'Clim ne refroidit plus', symptoms: ['Air tiède', 'Pas de froid'], causes: ['Manque de gaz', 'Compresseur HS', 'Fuite'], solutions: ['Recharge de clim', 'Réparer la fuite', 'Changer le compresseur'], urgency: 'low', estimatedCost: '80€ - 800€' }
    ]
  },
  {
    id: 'electricite', name: 'Électricité', icon: '⚡', description: 'Problèmes électriques divers',
    problems: [
      { id: 'e1', title: 'Feux ne fonctionnent pas', symptoms: ['Phares éteints', 'Clignotants HS'], causes: ['Ampoules grillées', 'Fusible grillé', 'Problème de relais'], solutions: ['Changer les ampoules', 'Vérifier les fusibles', 'Tester les relais'], urgency: 'medium', estimatedCost: '10€ - 100€' }
    ]
  },
  {
    id: 'transmission', name: 'Transmission', icon: '🔄', description: 'Boîte de vitesses, embrayage',
    problems: [
      { id: 't1', title: 'Embrayage patine', symptoms: ['Régime monte sans accélérer', 'Odeur de brûlé'], causes: ['Disque usé', 'Mécanisme fatigué', 'Butée HS'], solutions: ["Remplacer l'embrayage", 'Changer la butée', 'Kit complet'], urgency: 'high', estimatedCost: '450€ - 900€' }
    ]
  }
]

const assurances = [
  { name: 'MAAF', color: '#0055A4' }, { name: 'AXA', color: '#009639' },
  { name: 'MMA', color: '#E30613' }, { name: 'Groupama', color: '#00A650' },
  { name: 'MACIF', color: '#00AEEF' }, { name: 'Allianz', color: '#003399' },
  { name: 'MAIF', color: '#00A9E0' }, { name: 'GMF', color: '#E30613' }
]

const villes = ['Saint-Denis', 'Saint-Pierre', 'Saint-Paul', 'Le Tampon', 'Saint-André', 'Saint-Louis', 'Le Port', 'Saint-Benoît']

function Home() {
  const navigate = useNavigate()
  return (
    <div className="app">
      <div className="header">
        <img src={logoImg} alt="KAZ AUTO 974" className="logo" />
        <h1>KAZ AUTO</h1>
        <h1 style={{fontSize: '36px', marginTop: '-5px'}}>974</h1>
        <p>Votre auto à La Réunion</p>
      </div>
      <div className="search-bar" onClick={() => navigate('/recherche')}>
        <span>🔍</span>
        <input type="text" placeholder="Trouver un garage près de chez moi" readOnly />
        <span>📍</span>
      </div>
      <h2 className="section-title">Accès rapide</h2>
      <div className="quick-actions">
        <div className="action-card" onClick={() => navigate('/recherche')}><div className="icon">🔍</div><div className="title">Trouver un garage</div></div>
        <div className="action-card" onClick={() => navigate('/diagnostic')}><div className="icon">🔧</div><div className="title">Diagnostiquer</div></div>
        <div className="action-card" onClick={() => navigate('/assurances')}><div className="icon">🛡️</div><div className="title">Assurances</div></div>
        <div className="action-card" onClick={() => navigate('/recherche')}><div className="icon">🚨</div><div className="title">Urgence</div></div>
      </div>
      <h2 className="section-title">Garages populaires</h2>
      <div className="garage-list">
        {garages.slice(0, 2).map(garage => (
          <div key={garage.id} className="garage-card" onClick={() => navigate(`/garage/${garage.id}`)}>
            <h3>{garage.name}</h3>
            <div className="location">{garage.address.split(',')[0]}</div>
            <div className="rating"><span className="star">⭐</span><span>{garage.rating} ({garage.reviews} avis)</span></div>
          </div>
        ))}
      </div>
      <button className="emergency-btn" onClick={() => navigate('/recherche')}><span>📞</span><span>Besoin d'un dépannage urgent ?</span></button>
    </div>
  )
}

function Recherche() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVille, setSelectedVille] = useState(null)
  const [selectedAssurance, setSelectedAssurance] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredGarages = garages.filter(garage => {
    const matchSearch = garage.name.toLowerCase().includes(searchQuery.toLowerCase()) || garage.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchVille = !selectedVille || garage.address.includes(selectedVille)
    const matchAssurance = !selectedAssurance || garage.assurances.includes(selectedAssurance)
    return matchSearch && matchVille && matchAssurance
  })

  return (
    <div className="app">
      <div className="search-bar">
        <span>🔍</span>
        <input type="text" placeholder="Rechercher un garage..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <span onClick={() => setShowFilters(true)} style={{cursor: 'pointer'}}>⚙️</span>
      </div>
      <div className="garage-list">
        {filteredGarages.map(garage => (
          <div key={garage.id} className="garage-card" onClick={() => navigate(`/garage/${garage.id}`)}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <div><h3>{garage.name}</h3><div className="location">{garage.address}</div></div>
              <div className="rating"><span className="star">⭐</span><span>{garage.rating}</span><span style={{color: '#B8B8B8', marginLeft: '3px'}}> ({garage.reviews})</span></div>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px'}}>
              {garage.specialties.slice(0, 3).map((spec, i) => (<span key={i} style={{background: 'rgba(205, 127, 50, 0.2)', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', color: '#CD7F32'}}>{spec}</span>))}
            </div>
            <div style={{marginBottom: '10px'}}>
              <div style={{color: '#B8B8B8', fontSize: '12px', marginBottom: '5px'}}>Assurances:</div>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                {garage.assurances.slice(0, 4).map((assur, i) => (<span key={i} style={{background: '#0A0A0A', padding: '3px 8px', borderRadius: '5px', fontSize: '12px'}}>{assur}</span>))}
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #2A2A2A', paddingTop: '10px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '5px', color: '#CD7F32'}}><span>📞</span><span style={{fontSize: '14px'}}>{garage.phone}</span></div>
              <span>📍</span>
            </div>
          </div>
        ))}
      </div>
      {showFilters && (
        <div className="filter-modal">
          <div className="filter-content">
            <div className="filter-header"><h2>Filtres</h2><button className="close-btn" onClick={() => setShowFilters(false)}>×</button></div>
            <div className="filter-label">Ville</div>
            <div className="filter-options">
              {villes.map((ville, i) => (<div key={i} className={`filter-option ${selectedVille === ville ? 'selected' : ''}`} onClick={() => setSelectedVille(selectedVille === ville ? null : ville)}>{ville}</div>))}
            </div>
            <div className="filter-label">Assurance</div>
            <div className="filter-options">
              {assurances.map((assur, i) => (<div key={i} className={`filter-option ${selectedAssurance === assur.name ? 'selected' : ''}`} onClick={() => setSelectedAssurance(selectedAssurance === assur.name ? null : assur.name)}>{assur.name}</div>))}
            </div>
            <button className="apply-btn" onClick={() => setShowFilters(false)}>Appliquer les filtres</button>
          </div>
        </div>
      )}
    </div>
  )
}

function Diagnostic() {
  const navigate = useNavigate()
  return (
    <div className="app">
      <div style={{padding: '20px', textAlign: 'center'}}>
        <h1 style={{color: '#CD7F32', fontSize: '28px', marginBottom: '10px'}}>Diagnostic ma panne</h1>
        <p style={{color: '#B8B8B8', fontSize: '14px'}}>Sélectionnez la catégorie de votre problème</p>
      </div>
      <div className="diagnostic-grid">
        {diagnosticCategories.map(category => (
          <div key={category.id} className="diagnostic-card" onClick={() => navigate(`/diagnostic/${category.id}`)}>
            <div className="icon">{category.icon}</div>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
      <div className="help-section">
        <h3>Besoin d'aide ?</h3>
        <p>Si vous ne trouvez pas votre problème, contactez un de nos experts</p>
        <button className="help-btn"><span>💬</span><span>Contacter un expert</span></button>
      </div>
    </div>
  )
}

function DiagnosticDetail() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const category = diagnosticCategories.find(c => c.id === categoryId)
  const [selectedProblem, setSelectedProblem] = useState(null)

  const getUrgencyClass = (urgency) => `urgency-${urgency}`
  const getUrgencyText = (urgency) => {
    const texts = { critical: 'Urgent', high: 'Important', medium: 'Moyen', low: 'Faible' }
    return texts[urgency] || 'Faible'
  }

  return (
    <div className="app">
      <button className="back-btn" onClick={() => navigate('/diagnostic')}>← Retour</button>
      <div style={{padding: '20px', textAlign: 'center', borderBottom: '1px solid #2A2A2A'}}>
        <div style={{width: '100px', height: '100px', background: 'rgba(205, 127, 50, 0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', margin: '0 auto 15px'}}>{category.icon}</div>
        <h1 style={{fontSize: '24px', marginBottom: '5px'}}>{category.name}</h1>
        <p style={{color: '#B8B8B8', fontSize: '14px'}}>{category.description}</p>
      </div>
      <h2 className="section-title">Problèmes courants</h2>
      {category.problems.map(problem => (
        <div key={problem.id} className={`problem-card ${selectedProblem?.id === problem.id ? 'selected' : ''}`} onClick={() => setSelectedProblem(selectedProblem?.id === problem.id ? null : problem)}>
          <div className="problem-header">
            <h4>{problem.title}</h4>
            <span className={`urgency-badge ${getUrgencyClass(problem.urgency)}`}>{getUrgencyText(problem.urgency)}</span>
          </div>
          {selectedProblem?.id === problem.id && (
            <div className="problem-details">
              <div className="detail-section">
                <h5>Symptômes:</h5>
                {problem.symptoms.map((symptom, i) => (<div key={i} className="detail-item"><span>⚠️</span><span>{symptom}</span></div>))}
              </div>
              <div className="detail-section">
                <h5>Causes possibles:</h5>
                {problem.causes.map((cause, i) => (<div key={i} className="detail-item"><span>🔴</span><span>{cause}</span></div>))}
              </div>
              <div className="detail-section">
                <h5>Solutions recommandées:</h5>
                {problem.solutions.map((solution, i) => (<div key={i} className="detail-item"><span>✅</span><span>{solution}</span></div>))}
              </div>
              <div className="cost-container">
                <span className="cost-label">Coût estimé:</span>
                <span className="cost-value">{problem.estimatedCost}</span>
              </div>
              <button className="find-garage-btn" onClick={() => navigate('/recherche')}><span>🔍</span><span>Trouver un spécialiste</span></button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function Assurances() {
  const [selectedAssurance, setSelectedAssurance] = useState(null)
  const getGaragesForAssurance = (assuranceName) => garages.filter(g => g.assurances.includes(assuranceName))

  return (
    <div className="app">
      <div style={{padding: '20px', textAlign: 'center'}}>
        <h1 style={{fontSize: '24px', marginBottom: '10px'}}>Comparateur d'assurances</h1>
        <p style={{color: '#B8B8B8', fontSize: '14px'}}>Découvrez quels garages acceptent votre assurance</p>
      </div>
      <div className="info-card">
        <span style={{fontSize: '24px'}}>ℹ️</span>
        <p>Sélectionnez votre assurance pour voir les garages partenaires à La Réunion</p>
      </div>
      <div style={{padding: '15px'}}>
        {assurances.map(assurance => {
          const garagesCount = getGaragesForAssurance(assurance.name).length
          const isSelected = selectedAssurance === assurance.name
          return (
            <div key={assurance.name} className="insurance-card" style={{borderLeftColor: assurance.color}}>
              <div className="insurance-header" onClick={() => setSelectedAssurance(isSelected ? null : assurance.name)}>
                <div className="insurance-logo" style={{background: assurance.color}}>{assurance.name.charAt(0)}</div>
                <div className="insurance-info"><h3>{assurance.name}</h3><p>{garagesCount} garages partenaires</p></div>
                <span style={{fontSize: '24px', color: '#B8B8B8'}}>{isSelected ? '▲' : '▼'}</span>
              </div>
              {isSelected && (
                <div className="garages-list">
                  {getGaragesForAssurance(assurance.name).map((garage, i) => (
                    <div key={i} className="garage-item">
                      <span>📍</span>
                      <div><h4>{garage.name}</h4><p>{garage.address.split(',')[0]}</p></div>
                    </div>
                  ))}
                  {garagesCount === 0 && <p style={{color: '#B8B8B8', textAlign: 'center', fontStyle: 'italic', padding: '10px'}}>Aucun garage partenaire pour cette assurance</p>}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function GarageDetail() {
  const { garageId } = useParams()
  const navigate = useNavigate()
  const garage = garages.find(g => g.id === garageId)

  const callGarage = () => { window.location.href = `tel:${garage.phone.replace(/\s/g, '')}` }
  const openMap = () => { window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(garage.address)}`, '_blank') }

  return (
    <div className="app">
      <button className="back-btn" onClick={() => navigate(-1)}>← Retour</button>
      <div className="garage-detail">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', background: '#0A0A0A', padding: '8px 15px', borderRadius: '20px', marginBottom: '20px', width: 'fit-content', margin: '0 auto 20px'}}>
          <span className="star">⭐</span><span style={{fontSize: '18px', fontWeight: 'bold'}}>{garage.rating}</span>
          <span style={{color: '#B8B8B8', marginLeft: '5px'}}>({garage.reviews} avis)</span>
        </div>
        <h1>{garage.name}</h1>
        <div className="address"><span>📍</span><span>{garage.address}</span></div>
        <div className="phone" onClick={callGarage}><span>📞</span><span>{garage.phone}</span></div>
        <h3 className="detail-section-title">Spécialités</h3>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {garage.specialties.map((spec, i) => (<div key={i} className="specialty-badge"><span>✅</span><span>{spec}</span></div>))}
        </div>
        <h3 className="detail-section-title">Assurances acceptées</h3>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {garage.assurances.map((assur, i) => (<div key={i} className="assurance-badge">{assur}</div>))}
        </div>
        <h3 className="detail-section-title">Horaires d'ouverture</h3>
        {Object.entries(garage.horaires).map(([day, hours]) => (
          <div key={day} className="horaire-item">
            <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
            <span style={{color: hours === 'Fermé' ? '#F44336' : '#B8B8B8'}}>{hours}</span>
          </div>
        ))}
        <h3 className="detail-section-title">Tarifs indicatifs</h3>
        {Object.entries(garage.prixIndicatifs).map(([service, price]) => (
          <div key={service} className="prix-item">
            <span style={{color: '#B8B8B8', textTransform: 'capitalize'}}>{service}</span>
            <span className="price">{price}</span>
          </div>
        ))}
        <div className="action-buttons">
          <button className="action-btn" onClick={openMap}><span>🗺️</span><span>Itinéraire</span></button>
          <button className="action-btn call" onClick={callGarage}><span>📞</span><span>Appeler</span></button>
        </div>
      </div>
    </div>
  )
}

function Profil() {
  const menuItems = [
    { icon: '', title: 'Mes véhicules' }, { icon: '📅', title: 'Mes rendez-vous' },
    { icon: '📋', title: "Carnet d'entretien" }, { icon: '🔔', title: 'Notifications' },
    { icon: '⭐', title: 'Mes avis' }, { icon: '❓', title: 'Aide & Support' }, { icon: '⚙️', title: 'Paramètres' }
  ]

  return (
    <div className="app">
      <div className="profile-header">
        <div className="avatar"></div>
        <h2>Utilisateur 974</h2>
        <p>utilisateur@example.com</p>
        <div className="edit-btn">Modifier le profil</div>
      </div>
      <div>
        {menuItems.map((item, i) => (
          <div key={i} className="menu-item">
            <div className="menu-icon">{item.icon}</div>
            <div className="menu-title">{item.title}</div>
            <span style={{color: '#B8B8B8'}}>›</span>
          </div>
        ))}
      </div>
      <div style={{padding: '20px', textAlign: 'center'}}>
        <p style={{color: '#B8B8B8', fontSize: '14px', marginBottom: '5px'}}>KAZ AUTO 974 v1.0.0</p>
        <p style={{color: '#B8B8B8', fontSize: '12px'}}>© 2024 - La Réunion</p>
      </div>
    </div>
  )
}

function BottomNav({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'accueil', icon: '🏠', label: 'Accueil', path: '/' },
    { id: 'recherche', icon: '', label: 'Recherche', path: '/recherche' },
    { id: 'diagnostic', icon: '🔧', label: 'Diagnostic', path: '/diagnostic' },
    { id: 'assurances', icon: '️', label: 'Assurances', path: '/assurances' },
    { id: 'profil', icon: '👤', label: 'Profil', path: '/profil' }
  ]

  return (
    <div className="bottom-nav">
      {navItems.map(item => (
        <div key={item.id} className={`nav-item ${currentPage === item.id ? 'active' : ''}`} onClick={() => onNavigate(item.path)}>
          <span className="icon">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('accueil')
  const navigate = useNavigate()

  const handleNavigate = (path) => {
    navigate(path)
    if (path === '/') setCurrentPage('accueil')
    else if (path === '/recherche') setCurrentPage('recherche')
    else if (path === '/diagnostic') setCurrentPage('diagnostic')
    else if (path === '/assurances') setCurrentPage('assurances')
    else if (path === '/profil') setCurrentPage('profil')
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recherche" element={<Recherche />} />
        <Route path="/diagnostic" element={<Diagnostic />} />
        <Route path="/diagnostic/:categoryId" element={<DiagnosticDetail />} />
        <Route path="/assurances" element={<Assurances />} />
        <Route path="/garage/:garageId" element={<GarageDetail />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App