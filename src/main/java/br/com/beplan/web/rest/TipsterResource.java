package br.com.beplan.web.rest;

import br.com.beplan.domain.Tipster;
import br.com.beplan.repository.TipsterRepository;
import br.com.beplan.security.AuthoritiesConstants;
import br.com.beplan.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.beplan.domain.Tipster}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipsterResource {

    private final Logger log = LoggerFactory.getLogger(TipsterResource.class);

    private static final String ENTITY_NAME = "tipster";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipsterRepository tipsterRepository;

    public TipsterResource(TipsterRepository tipsterRepository) {
        this.tipsterRepository = tipsterRepository;
    }

    /**
     * {@code POST  /tipsters} : Create a new tipster.
     *
     * @param tipster the tipster to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipster, or with status {@code 400 (Bad Request)} if the tipster has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipsters")    
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Tipster> createTipster(@RequestBody Tipster tipster) throws URISyntaxException {
        log.debug("REST request to save Tipster : {}", tipster);
        if (tipster.getId() != null) {
            throw new BadRequestAlertException("A new tipster cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tipster result = tipsterRepository.save(tipster);
        return ResponseEntity.created(new URI("/api/tipsters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipsters} : Updates an existing tipster.
     *
     * @param tipster the tipster to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipster,
     * or with status {@code 400 (Bad Request)} if the tipster is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipster couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipsters")    
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Tipster> updateTipster(@RequestBody Tipster tipster) throws URISyntaxException {
        log.debug("REST request to update Tipster : {}", tipster);
        if (tipster.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tipster result = tipsterRepository.save(tipster);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipster.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipsters} : get all the tipsters.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipsters in body.
     */
    @GetMapping("/tipsters")
    public List<Tipster> getAllTipsters() {
        log.debug("REST request to get all Tipsters");
        return tipsterRepository.findAll();
    }

    /**
     * {@code GET  /tipsters/:id} : get the "id" tipster.
     *
     * @param id the id of the tipster to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipster, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipsters/{id}")
    public ResponseEntity<Tipster> getTipster(@PathVariable Long id) {
        log.debug("REST request to get Tipster : {}", id);
        Optional<Tipster> tipster = tipsterRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipster);
    }

    /**
     * {@code DELETE  /tipsters/:id} : delete the "id" tipster.
     *
     * @param id the id of the tipster to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipsters/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteTipster(@PathVariable Long id) {
        log.debug("REST request to delete Tipster : {}", id);
        tipsterRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
