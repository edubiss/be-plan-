package br.com.beplan.web.rest;

import br.com.beplan.BePlanApp;
import br.com.beplan.domain.Tipster;
import br.com.beplan.repository.TipsterRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TipsterResource} REST controller.
 */
@SpringBootTest(classes = BePlanApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipsterResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_DESEMPENHO = new BigDecimal(1);
    private static final BigDecimal UPDATED_DESEMPENHO = new BigDecimal(2);

    private static final BigDecimal DEFAULT_DESEMPENHO_MES = new BigDecimal(1);
    private static final BigDecimal UPDATED_DESEMPENHO_MES = new BigDecimal(2);

    private static final BigDecimal DEFAULT_DESEMPENHO_ANO = new BigDecimal(1);
    private static final BigDecimal UPDATED_DESEMPENHO_ANO = new BigDecimal(2);

    private static final BigDecimal DEFAULT_DESEMPENHO_TOTAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_DESEMPENHO_TOTAL = new BigDecimal(2);

    private static final String DEFAULT_ESPORTE = "AAAAAAAAAA";
    private static final String UPDATED_ESPORTE = "BBBBBBBBBB";

    private static final String DEFAULT_HORARIOS = "AAAAAAAAAA";
    private static final String UPDATED_HORARIOS = "BBBBBBBBBB";

    private static final Long DEFAULT_NR_TIPS_DIA = 1L;
    private static final Long UPDATED_NR_TIPS_DIA = 2L;

    private static final Instant DEFAULT_DATA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TipsterRepository tipsterRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipsterMockMvc;

    private Tipster tipster;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tipster createEntity(EntityManager em) {
        Tipster tipster = new Tipster()
            .nome(DEFAULT_NOME)
            .desempenho(DEFAULT_DESEMPENHO)
            .desempenhoMes(DEFAULT_DESEMPENHO_MES)
            .desempenhoAno(DEFAULT_DESEMPENHO_ANO)
            .desempenhoTotal(DEFAULT_DESEMPENHO_TOTAL)
            .esporte(DEFAULT_ESPORTE)
            .horarios(DEFAULT_HORARIOS)
            .nrTipsDia(DEFAULT_NR_TIPS_DIA)
            .data(DEFAULT_DATA);
        return tipster;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tipster createUpdatedEntity(EntityManager em) {
        Tipster tipster = new Tipster()
            .nome(UPDATED_NOME)
            .desempenho(UPDATED_DESEMPENHO)
            .desempenhoMes(UPDATED_DESEMPENHO_MES)
            .desempenhoAno(UPDATED_DESEMPENHO_ANO)
            .desempenhoTotal(UPDATED_DESEMPENHO_TOTAL)
            .esporte(UPDATED_ESPORTE)
            .horarios(UPDATED_HORARIOS)
            .nrTipsDia(UPDATED_NR_TIPS_DIA)
            .data(UPDATED_DATA);
        return tipster;
    }

    @BeforeEach
    public void initTest() {
        tipster = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipster() throws Exception {
        int databaseSizeBeforeCreate = tipsterRepository.findAll().size();
        // Create the Tipster
        restTipsterMockMvc.perform(post("/api/tipsters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipster)))
            .andExpect(status().isCreated());

        // Validate the Tipster in the database
        List<Tipster> tipsterList = tipsterRepository.findAll();
        assertThat(tipsterList).hasSize(databaseSizeBeforeCreate + 1);
        Tipster testTipster = tipsterList.get(tipsterList.size() - 1);
        assertThat(testTipster.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTipster.getDesempenho()).isEqualTo(DEFAULT_DESEMPENHO);
        assertThat(testTipster.getDesempenhoMes()).isEqualTo(DEFAULT_DESEMPENHO_MES);
        assertThat(testTipster.getDesempenhoAno()).isEqualTo(DEFAULT_DESEMPENHO_ANO);
        assertThat(testTipster.getDesempenhoTotal()).isEqualTo(DEFAULT_DESEMPENHO_TOTAL);
        assertThat(testTipster.getEsporte()).isEqualTo(DEFAULT_ESPORTE);
        assertThat(testTipster.getHorarios()).isEqualTo(DEFAULT_HORARIOS);
        assertThat(testTipster.getNrTipsDia()).isEqualTo(DEFAULT_NR_TIPS_DIA);
        assertThat(testTipster.getData()).isEqualTo(DEFAULT_DATA);
    }

    @Test
    @Transactional
    public void createTipsterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipsterRepository.findAll().size();

        // Create the Tipster with an existing ID
        tipster.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipsterMockMvc.perform(post("/api/tipsters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipster)))
            .andExpect(status().isBadRequest());

        // Validate the Tipster in the database
        List<Tipster> tipsterList = tipsterRepository.findAll();
        assertThat(tipsterList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipsters() throws Exception {
        // Initialize the database
        tipsterRepository.saveAndFlush(tipster);

        // Get all the tipsterList
        restTipsterMockMvc.perform(get("/api/tipsters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipster.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].desempenho").value(hasItem(DEFAULT_DESEMPENHO.intValue())))
            .andExpect(jsonPath("$.[*].desempenhoMes").value(hasItem(DEFAULT_DESEMPENHO_MES.intValue())))
            .andExpect(jsonPath("$.[*].desempenhoAno").value(hasItem(DEFAULT_DESEMPENHO_ANO.intValue())))
            .andExpect(jsonPath("$.[*].desempenhoTotal").value(hasItem(DEFAULT_DESEMPENHO_TOTAL.intValue())))
            .andExpect(jsonPath("$.[*].esporte").value(hasItem(DEFAULT_ESPORTE)))
            .andExpect(jsonPath("$.[*].horarios").value(hasItem(DEFAULT_HORARIOS)))
            .andExpect(jsonPath("$.[*].nrTipsDia").value(hasItem(DEFAULT_NR_TIPS_DIA.intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())));
    }
    
    @Test
    @Transactional
    public void getTipster() throws Exception {
        // Initialize the database
        tipsterRepository.saveAndFlush(tipster);

        // Get the tipster
        restTipsterMockMvc.perform(get("/api/tipsters/{id}", tipster.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipster.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.desempenho").value(DEFAULT_DESEMPENHO.intValue()))
            .andExpect(jsonPath("$.desempenhoMes").value(DEFAULT_DESEMPENHO_MES.intValue()))
            .andExpect(jsonPath("$.desempenhoAno").value(DEFAULT_DESEMPENHO_ANO.intValue()))
            .andExpect(jsonPath("$.desempenhoTotal").value(DEFAULT_DESEMPENHO_TOTAL.intValue()))
            .andExpect(jsonPath("$.esporte").value(DEFAULT_ESPORTE))
            .andExpect(jsonPath("$.horarios").value(DEFAULT_HORARIOS))
            .andExpect(jsonPath("$.nrTipsDia").value(DEFAULT_NR_TIPS_DIA.intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTipster() throws Exception {
        // Get the tipster
        restTipsterMockMvc.perform(get("/api/tipsters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipster() throws Exception {
        // Initialize the database
        tipsterRepository.saveAndFlush(tipster);

        int databaseSizeBeforeUpdate = tipsterRepository.findAll().size();

        // Update the tipster
        Tipster updatedTipster = tipsterRepository.findById(tipster.getId()).get();
        // Disconnect from session so that the updates on updatedTipster are not directly saved in db
        em.detach(updatedTipster);
        updatedTipster
            .nome(UPDATED_NOME)
            .desempenho(UPDATED_DESEMPENHO)
            .desempenhoMes(UPDATED_DESEMPENHO_MES)
            .desempenhoAno(UPDATED_DESEMPENHO_ANO)
            .desempenhoTotal(UPDATED_DESEMPENHO_TOTAL)
            .esporte(UPDATED_ESPORTE)
            .horarios(UPDATED_HORARIOS)
            .nrTipsDia(UPDATED_NR_TIPS_DIA)
            .data(UPDATED_DATA);

        restTipsterMockMvc.perform(put("/api/tipsters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipster)))
            .andExpect(status().isOk());

        // Validate the Tipster in the database
        List<Tipster> tipsterList = tipsterRepository.findAll();
        assertThat(tipsterList).hasSize(databaseSizeBeforeUpdate);
        Tipster testTipster = tipsterList.get(tipsterList.size() - 1);
        assertThat(testTipster.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTipster.getDesempenho()).isEqualTo(UPDATED_DESEMPENHO);
        assertThat(testTipster.getDesempenhoMes()).isEqualTo(UPDATED_DESEMPENHO_MES);
        assertThat(testTipster.getDesempenhoAno()).isEqualTo(UPDATED_DESEMPENHO_ANO);
        assertThat(testTipster.getDesempenhoTotal()).isEqualTo(UPDATED_DESEMPENHO_TOTAL);
        assertThat(testTipster.getEsporte()).isEqualTo(UPDATED_ESPORTE);
        assertThat(testTipster.getHorarios()).isEqualTo(UPDATED_HORARIOS);
        assertThat(testTipster.getNrTipsDia()).isEqualTo(UPDATED_NR_TIPS_DIA);
        assertThat(testTipster.getData()).isEqualTo(UPDATED_DATA);
    }

    @Test
    @Transactional
    public void updateNonExistingTipster() throws Exception {
        int databaseSizeBeforeUpdate = tipsterRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipsterMockMvc.perform(put("/api/tipsters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipster)))
            .andExpect(status().isBadRequest());

        // Validate the Tipster in the database
        List<Tipster> tipsterList = tipsterRepository.findAll();
        assertThat(tipsterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipster() throws Exception {
        // Initialize the database
        tipsterRepository.saveAndFlush(tipster);

        int databaseSizeBeforeDelete = tipsterRepository.findAll().size();

        // Delete the tipster
        restTipsterMockMvc.perform(delete("/api/tipsters/{id}", tipster.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tipster> tipsterList = tipsterRepository.findAll();
        assertThat(tipsterList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
